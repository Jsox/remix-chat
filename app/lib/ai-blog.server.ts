import { Configuration, OpenAIApi } from 'openai';
import { streamAsyncIterable } from './stream-async-iterable';
import * as dotenv from 'dotenv';
import { createParser } from 'eventsource-parser';
import { fetchSSE } from './fetch-sse';
import fs from 'fs';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

interface ISettingsCategory {
    model: string;
    prompt: string;
    temperature: number;
    max_tokens: number;
    top_p: number;
    frequency_penalty: number;
    presence_penalty: number;
}

interface ISettings {
    generateBlogTopics: ISettingsCategory;
    generateBlogSections: ISettingsCategory;
    blogSectionExpander: ISettingsCategory;
}
type Job = 'generateBlogSections' | 'generateBlogSectionTopicsTitles' | 'generateBlogPostByTitle' | 'test';

export class BlogGenerator {
    private settings: ISettings[ISettingsCategory];
    private model: 'text-davinci-003' | 'text-curie-001' | 'text-ada-001';
    generateNum: number;

    constructor(private job: Job, query: string, generateNum: number = 10) {
        this.model = 'text-davinci-003';
        this.generateNum = generateNum;
        this.settings = {
            test: {
                model: this.model,
                prompt: `${query}`,
                temperature: 0.6,
                max_tokens: 25,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            },
            generateBlogSections: {
                model: this.model,
                prompt: `Expand the blog Theme in to high level blog sections. Blog Theme: ${query}\nGenerate ${this.generateNum} pcs.\nAnswer in JSON array:\n
                    [{
                        "sectionTitle": "",
                        "sectionMetaTitle": "",
                        "sectionHtmlDescription": "",
                        "sectionMetaDescription": "",
                        "sectionSlug": ""
                        "sectionKeyWords": []
                    }]\n\n`,
                temperature: 0.6,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            },
            generateBlogSectionTopicsTitles: {
                model: this.model,
                prompt: `Expand the blog Section in to blog topics.\nBlog Section: ${query}\nGenerate ${this.generateNum} pcs.\nAnswer in JSON array:\n
                [
                    "topicTitle": "",
                    "topicMetaDescription": "",
                ]`,
                temperature: 0.8,
                max_tokens: 2000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            },
            generateBlogPostByTitle: {
                model: this.model,
                prompt: `Expand the blog topic title in to a detailed professional, witty and clever blog post. Topic title: ${query}\n
                    Answer in JSON array:\n
                    {
                        "topicTitle": "",
                        "topicMetaTitle": "",
                        "topicHtmlSummary": "",
                        "topicMetaDescription": "",
                        "topicHtmlPost": ""
                        "topicSlug": ""
                        "topicKeyWords": []
                    }`,
                temperature: 0.8,
                max_tokens: 4000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            },
        };
    }

    async runSse(uuid) {
        const queryModel = this.settings[this.job];
        const key = process.env.OPENAI_API_KEY || '';
        let wholeText = '';

        const onMessage = async (message: string) => {
            if (message != '[DONE]') {
                let json = JSON.parse(message);
                const text = json.choices[0].text;
                wholeText += text;
                // fs.appendFile(`./messages/${uuid}`, text, function (err) {
                //     if (err) {
                //         return console.log(err);
                //     }
                // });
                // console.log(text);
                console.log({ wholeText });
                return text;
            } else {
                // let json = JSON.parse(message);
                // const finishReason = json.choices[0].finish_reason;
                // const text = json.choices[0].text;
                // console.log({ text }, { finishReason });
                console.log('!!!!!!![DONE]');
            }
        };

        try {
            const res = await fetchSSE('https://api.openai.com/v1/completions', {
                onMessage,
                headers: {
                    Authorization: `Bearer ${key}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(queryModel),
            });
            return wholeText;
        } catch (error) {
            console.log({ ERRORSSE: error });
        }
    }

    async run() {
        const queryModel = this.settings[this.job];
        console.log(queryModel);

        try {
            const completion = await openai.createCompletion(queryModel);
            console.log({ data: completion.data.choices[0] });
            return completion.data;
        } catch (error: any) {
            console.log({ ERROR: error });
            return { error: error.message };
        }
    }
}
// const completion = await openai.createCompletion();
