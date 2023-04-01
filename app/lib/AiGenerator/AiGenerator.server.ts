import type { ChatCompletition, Completition, Project, Section, User } from "@prisma/client";
import { sectionNeededFields } from "app/routes/api.createSectionExtend";
import { emitter } from "app/services/emitter";
import type { CompletionRequest, ChatCompletionResponse } from "app/types";
import { json } from "react-router";
import { fetchSSE } from "../fetch-sse";
import { prismaClient } from "../Prisma";
import { completionWrite } from "./completitionWrite.server";
import { type ErrorAnswer, errorHandler, sendToTelegram } from "./errorHandler";
import { blogSectionExtendJobWrite, jobWrite } from "./jobWrite.server";

export type Job = 'blogSections' | 'blogTopics' | 'blogSectionExtend' | 'blogTopicExtend' | 'chat';

export interface AiGeneratorOpts {
    user: User;
    uniqueUserString?: string;
}

export class AiGenerator {
    job?: Job
    user: User
    project?: Project | null
    uniqueUserString: string
    generateNum = 2
    url = 'https://api.openai.com/v1/chat/completions'
    OPENAI_API_KEY = process.env.OPENAI_API_KEY
    promptText = ''
    chatCompletionText: string = ''
    chatCompletionResponse: ChatCompletionResponse | undefined;
    chatCompletion: ChatCompletition | ErrorAnswer | undefined;
    totalChars: number = 0
    totalTokens: number = 0
    completion: Completition | ErrorAnswer | null = null
    sectionToExtend: sectionNeededFields | null | undefined

    constructor(opts: AiGeneratorOpts) {
        const { user, uniqueUserString } = opts;
        this.user = user;
        this.uniqueUserString = uniqueUserString || '';
    }

    async blogSections(project: Project) {
        this.job = 'blogSections';
        this.project = project || null;

        if (!this.project) {
            return errorHandler({
                message: 'no project',
                from: 'AiGenerator blogSections',
                returnJson: true
            })
        }

        const message: any = await this.fetch()

        if (message?.error) {
            return errorHandler({ message: message?.error, from: 'AiGenerator: blogSections', returnJson: true })
        }

        const jobWritten: any = await jobWrite(this.user.id, this.project.id, this.job, message, this.chatCompletion.id)

        let decremented = 0

        if (!jobWritten?.error) {
            decremented = await this.writeOffUserChars(message)
        } else {
            return jobWritten
        }
        return { decremented }
    }


    async blogSectionExtend(section: sectionNeededFields, sid: number) {
        this.job = 'blogSectionExtend';

        if (!section) {
            return errorHandler({
                message: 'no section',
                from: 'AiGenerator blogSectionExtend',
                returnJson: true
            })
        }
        this.sectionToExtend = section

        const message: any = await this.fetch()

        if (message?.error) {
            return errorHandler({ message: message?.error, from: 'AiGenerator: blogSections', returnJson: true })
        }

        const jobWritten: any = await blogSectionExtendJobWrite(message, sid)

        let decremented = 0

        if (!jobWritten?.error) {
            decremented = await this.writeOffUserChars(message)
        } else {
            return jobWritten
        }
        return { decremented }
    }

    async writeOffUserChars(message: string) {
        await prismaClient.user.update({
            where: {
                id: this.user.id,
            },
            data: {
                tokens: {
                    decrement: this.totalTokens
                }
            }
        })

        return this.totalTokens
    }

    async fetch(): Promise<string | ErrorAnswer> {
        this.totalTokens = 0
        this.chatCompletionText = ''
        try {
            if (!this.user) {
                errorHandler({
                    message: 'Нужно авторизоваться',
                    from: 'AiGenerator fetch'
                })
            }
            if ((this.user?.tokens || 0) <= 0 && !this.user.isAdmin) {
                errorHandler({
                    message: `Токенов на балансе: ${this.user.tokens}. Нужно пополнить.`,
                    from: 'AiGenerator fetch',
                    data: this.user
                })
            }
            const options = this.buildFetchOptions()
            console.log("🚀 ~ file: AiGenerator.server.ts:136 ~ AiGenerator ~ fetch ~ options:", options)


            const onMessage = (data: string) => {
                if (data != '[DONE]') {
                    let chatCompletion: ChatCompletionResponse = JSON.parse(data)
                    let finishReason = chatCompletion.choices[0].finish_reason
                    let error = chatCompletion?.error

                    if ((!!finishReason && finishReason != 'stop') || error) {
                        errorHandler({
                            message: 'Ошибка. Попробуйте позже',
                            data: { chatCompletion },
                            from: 'AiGenerator: fetchSSE: onMessage'
                        })
                    }
                    this.chatCompletionResponse = chatCompletion

                    let dataText = chatCompletion.choices[0].delta?.content || null
                    console.log(dataText)

                    if (dataText) {
                        this.totalTokens++;
                        this.chatCompletionText += dataText;
                        this.emit(dataText.replace(/\n/g, "\\n"))
                    }
                } else {
                    this.emit('\\n\\n[DONE]')
                }
            }

            await fetchSSE(this.url, {
                onMessage,
                headers: {
                    Authorization: `Bearer ${this.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(options)
            })

            this.chatCompletion = await completionWrite(this.user.id, this.promptText, this.chatCompletionResponse, this.chatCompletionText, this.totalTokens)

            sendToTelegram({ completion: this.chatCompletion })

            return this.chatCompletionText;

        } catch (error: any) {
            return { error: error.message }
        }

    }

    buildFetchOptions(): CompletionRequest {
        return {
            ...completionRequestParamsTemplate,
            messages: this.buildMessagesArray()
        }
    }

    buildPromptText(): string {
        let answer = '';
        let addon = '';

        switch (this.job) {
            case 'blogSectionExtend':

                let existsText = 'Existing Blog Section fields is:\n'
                let notExistsText = '{\n'
                let emptyFields = 'Generate good, professional SEO text for:\n'

                for (const key in this.sectionToExtend) {
                    if (Object.prototype.hasOwnProperty.call(this.sectionToExtend, key)) {
                        const text = this.sectionToExtend[key];
                        if (text.trim().length === 0 || text.trim() == '<p></p>') {
                            notExistsText += `"${key}": "",\n`
                            emptyFields += `${this.toCapitalizedWords(key)}${key.includes('Html') ? ' - article (300-400 words) in HTML format, with one h2 header and h3 headers, paragraphs and lists' : ''}\n`
                        } else {
                            existsText += `${this.toCapitalizedWords(key)}: ${text}\n`
                        }
                    }
                }
                notExistsText += '}'

                answer = `
${existsText}
${emptyFields}
Answer in JSON object:
${notExistsText}\n\n`

                break;

            case 'blogSections':

                const sections: Section[] | null = this.project?.Sections

                if (sections?.length) {
                    addon = 'Existing blog sections:\n'
                    for (const s of sections) {
                        addon += s.sectionTitle + '\n'
                    }
                    addon += '\nDo not generate sections like existing.'
                }

                answer = `Expand the Blog Theme in to the high level blog sections.
Blog Theme: ${this.project?.title}
Generate not more than ${this.generateNum} blog sections.
${addon}
Answer in JSON array:\n
[{
    "sectionTitle": "",
    "sectionMetaDescription": "",
}]\n\n`
                break;

        }

        this.promptText = answer

        return answer;
    }

    buildMessagesArray(): {
        role: string;
        content: string;
    }[] {
        const prompt = this.buildPromptText();

        let answer: {
            role: string;
            content: string;
        }[] = [];

        const templates = {
            forWriter: [
                {
                    role: "system",
                    content: "You are a good AI SEO copywriter. You write good articles,  topics and sections for the blog. Answer only in JSON format and Russian language."
                },
                {
                    role: "user",
                    content: prompt
                },
            ],
            forChat: [
                {
                    role: "system",
                    content: `You are a helpful, smart and friendly assistant. Your name Аиша. Today is ${Date.now().toLocaleString()}. Answer in Russian language.`
                },
                {
                    role: "user",
                    content: prompt
                },
            ]
        }

        switch (this.job) {
            case 'blogSections':
            case 'blogTopics':
            case 'blogSectionExtend':
            case 'blogTopicExtend':

                answer = templates.forWriter
                break;

            case 'chat':

                answer = templates.forChat
                break;

            default:
                errorHandler({
                    message: 'Empty or wrong this->job',
                    from: 'AiGenerator: buildMessagesArray',
                    data: this.job
                })
        }
        return answer;
    }

    emit(message: string) {
        emitter.emit(this.uniqueUserString || '', message);
    }
    toCapitalizedWords(name: string) {
        var words = name.match(/[A-Za-z][a-z]*/g) || [];

        return words.map(this.capitalize).join(" ");
    }
    capitalize(word: string) {
        return word.charAt(0).toUpperCase() + word.substring(1);
    }
}

export const jobs = {

}


export const completionRequestParamsTemplate = {
    model: 'gpt-3.5-turbo',
    temperature: 0.8,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stream: true,
}

export function fromTextToTokens(text: string) {
    let tokensArray = text.match(/\\[^]|\.{3}|\w+|[^\w\s]/gu);
    console.log("🚀 ~ file: AiGenerator.server.ts:275 ~ fromTextToTokens ~ tokensArray:", tokensArray)
    let tokens = tokensArray.length
    console.log("🚀 ~ file: AiGenerator.server.ts:277 ~ fromTextToTokens ~ tokens:", tokens)

    return tokens
}