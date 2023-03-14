import type { ChatCompletition, Completition, Project, Section, User } from "@prisma/client";
import { emitter } from "app/services/emitter";
import type { CompletionRequest, ChatCompletionResponse } from "app/types";
import { json } from "react-router";
import { fetchSSE } from "../fetch-sse";
import { prismaClient } from "../Prisma";
import { completionWrite } from "./completitionWrite.server";
import { type ErrorAnswer, errorHandler, sendToTelegram } from "./errorHandler";
import { jobWrite } from "./jobWrite.server";

export type Job = 'blogSections' | 'blogTopics' | 'blogSectionExtend' | 'blogTopicExtend' | 'chat';

export interface AiGeneratorOpts {
    job: Job;
    user: User;
    project?: Project;
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
    chatCompletionResponse: ChatCompletionResponse;
    chatCompletion: ChatCompletition | ErrorAnswer;
    totalChars: number = 0
    completion: Completition | ErrorAnswer | null = null

    constructor(opts: AiGeneratorOpts) {
        const { user, project, uniqueUserString } = opts;
        this.user = user;
        this.project = project || null;
        this.uniqueUserString = uniqueUserString || '';
    }

    async blogSections() {
        this.job = 'blogSections';

        if (!this.project) {
            errorHandler({
                message: 'no project',
                from: 'AiGenerator blogSections'
            })
        }

        const message = await this.fetch()

        if (message?.error) {
            return errorHandler({ message: message?.error, from: 'AiGenerator: blogSections', returnJson: true })
        }

        const jobWritten = await jobWrite(this.user.id, this.project.id, this.job, message, this.chatCompletion.id)

        let decremented = 0

        if (!jobWritten?.error) {
            decremented = await this.writeOffUserChars(message)
        } else {
            return jobWritten
        }
        return { decremented }
    }

    async writeOffUserChars(message: string) {
        const totalChars = message?.length
        console.log({ totalChars })
        if (totalChars) {
            await prismaClient.user.update({
                where: {
                    id: this.user.id,
                },
                data: {
                    tokens: {
                        decrement: totalChars
                    }
                }
            })
        }
        return totalChars
    }

    async fetch(): Promise<string | ErrorAnswer> {
        try {
            if (!this.user) {
                errorHandler({
                    message: 'Нужно авторизоваться',
                    from: 'AiGenerator fetch'
                })
            }
            if (this.user.tokens <= 0 && !this.user.isAdmin) {
                errorHandler({
                    message: `Токенов на балансе: ${this.user.tokens}. Нужно пополнить.`,
                    from: 'AiGenerator fetch'
                })
            }
            const options = this.buildFetchOptions()

            this.chatCompletionText = ''
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

                    console.log(dataText);

                    if (dataText) {
                        this.chatCompletionText += dataText;
                        this.emit(dataText.replace(/\n/g, "\\n"))
                    }
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

            this.chatCompletion = await completionWrite(this.user.id, this.promptText, this.chatCompletionResponse, this.chatCompletionText)

            sendToTelegram({ completion: this.completion })

            return this.chatCompletionText;

        } catch (error: any) {
            return errorHandler({ message: error.message, data: error?.data, from: 'AiGenerator: fetch', returnJson: true })
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

        const sections: Section[] | null = this.project?.Sections

        if (sections?.length) {
            addon = 'Existing blog sections:\n'
            for (const s of sections) {
                addon += s.sectionTitle + '\n'
            }
            addon += '\nDo not generate sections like existing.'
        }

        switch (this.job) {
            case 'blogSections':

                answer = `Expand the Blog Theme in to the high level blog sections.
Blog Theme: ${this.project?.title}
Generate not more than ${this.generateNum} blog sections.
${addon}
Answer in JSON array:\n
[{
    "sectionTitle": "",
    "sectionMetaDescription": "",
}]\n\n`

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