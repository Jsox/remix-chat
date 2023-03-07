import type { Completition } from '@prisma/client';
import { type CompletionResponse } from 'app/types';
import type { CompletionRequest } from '../../types/index';
import { completionWrite } from './completitionWrite.server';

export type CompletionResponseOrError = Promise<CompletionResponse | { error: string }>

class AiFetcher {
    private static URL = 'https://api.openai.com/v1/completions'
    private static OPENAI_API_KEY = process.env.OPENAI_API_KEY

    static async answerAi(uid: number, query: CompletionRequest): Promise<({ error: string } | { text: string, completion: Completition })> {
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

            const text = json?.choices[0]?.text

            if (!text) {
                throw new Error('Пустой ответ')
            }

            const completion = await completionWrite(uid, JSON.stringify(query), json)


            if (completion?.error) {
                throw new Error(completion.error)
            }

            return { text, completion };

        } catch (error: any) {
            console.log('answerAi.error', error?.message)
            return {
                error: error?.message
            }
        }
    }
}
export const answerAi = AiFetcher.answerAi