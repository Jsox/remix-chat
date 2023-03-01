import { Configuration, CreateCompletionResponse, OpenAIApi } from 'openai';
import { streamAsyncIterable } from './stream-async-iterable';
import * as dotenv from 'dotenv';
import { createParser } from 'eventsource-parser';
import { fetchSSE } from './fetch-sse';
import fs from 'fs';
import { AiModels } from './AiModels';

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
    test: ISettingsCategory;
}
export type Job = 'generateBlogSections' | 'generateBlogSectionTopicsTitles' | 'generateBlogPostByTitle' | 'test';

export class Generator {
    private settings: ISettings[ISettingsCategory];
    private model: 'text-davinci-003' | 'text-curie-001' | 'text-ada-001';
    generateNum: number;
    private queryModel: ISettingsCategory;
    private job: Job;

    constructor(query: string, generateNum: number = 10) {
        this.model = 'text-davinci-003';
        this.generateNum = generateNum;
        this.settings = AiModels(query, this.model, this.generateNum);
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

    async generateBlogSections(): Promise<CreateCompletionResponse | Record<string, string>> {
        try {
            this.job = 'generateBlogSections';
            this.queryModel = this.settings[this.job];
            console.log(this.queryModel);
            const completion = await openai.createCompletion(this.queryModel);
            console.log({ data: completion.data.choices[0] });
            return completion.data;
        } catch (error: any) {
            console.log({ ERROR: error });
            return { error: error.message };
        }
    }
}
// const completion = await openai.createCompletion();
