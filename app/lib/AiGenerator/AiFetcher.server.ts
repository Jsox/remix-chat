import type { Completition } from '@prisma/client';
import { type CompletionResponse } from 'app/types';
import type { CompletionRequest } from '../../types/index';
import { completionWrite } from './completitionWrite.server';
import { type ErrorAnswer, errorHandler } from './errorHandler';

export type CompletionResponseOrError = Promise<CompletionResponse | { error: string }>

export const AiMessagesArray = (userMessage: string): Record<string, Record<string, string>[]> => {
    return {
        forWriter: [
            {
                role: "system",
                content: "You are a good AI SEO copywriter. You write good topics and sections for the blog. Answer only in JSON format."
            },
            {
                role: "user",
                content: userMessage
            },
        ],
        forChat: [
            {
                role: "system",
                content: `You are a helpful, smart and friendly assistant. Your name Aisha. Today is ${Date.now().toLocaleString()}`
            },
            {
                role: "user",
                content: userMessage
            },
        ]
    }
}

export class AiFetcher {
    public static MODEL = 'gpt-3.5-turbo'; //text-davinci-003
    public static IS_IT_CHAT = AiFetcher.MODEL === 'gpt-3.5-turbo';
    private static URL = AiFetcher.IS_IT_CHAT ? `https://api.openai.com/v1/chat/completions` : `https://api.openai.com/v1/completions`;
    private static OPENAI_API_KEY = process.env.OPENAI_API_KEY

    static async answerAi(uid: number, query: CompletionRequest): Promise<(ErrorAnswer | { text: string, completion: Completition })> {
        try {
            const res = await fetch(AiFetcher.URL, {
                headers: {
                    Authorization: `Bearer ${AiFetcher.OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                method: 'POST',
                body: JSON.stringify(query)
            })
            const json: CompletionResponse = await res.json();

            if (json?.error) {
                errorHandler({ message: 'Ошибка. Попробуйте позже', data: json?.error, from: 'answerAi: json?.error' })
            }


            const text = AiFetcher.IS_IT_CHAT ? json?.choices[0]?.message?.content : json?.choices[0]?.text

            if (!text) {
                errorHandler({ message: 'Ошибка. Попробуйте позже', data: json, from: 'answerAi: !text'})
            }

            const completion = await completionWrite(uid, JSON.stringify(query), json)


            if (completion?.error) {
                errorHandler({ message: 'Ошибка. Попробуйте позже', data: completion.error, from: 'answerAi: completion?.error' })
            }

            return { text, completion };

        } catch (error: any) {
            return errorHandler({ message: 'Ошибка. Попробуйте позже', returnJson: true })
        }
    }
}
export const answerAi = AiFetcher.answerAi