
import type { Section, Topic } from '@prisma/client';
import type { CompletionRequest } from '../../types/index';
import { filterAndTranslateTo } from '../filterAndTranslateTo';
import { answerAi } from './AiFetcher.server';
import { jobWrite } from './jobWrite.server';

export type ReturnAfterGenerate = Promise<(Section | Topic)[] | (Section | Topic) | number | {
    error: string;
}>

export async function generateBlogSections(uid: number, pid: number, opts: { blogTheme: string, generateNum?: number }): ReturnAfterGenerate {
    const { blogTheme, generateNum = 3, } = opts;

    const { error, errorMessage, resultEn, resultRu } = await filterAndTranslateTo(blogTheme, 'en', 'text')

    if (error) {
        return { error: errorMessage }
    }

    let model: CompletionRequest = {
        model: 'text-davinci-003',
        prompt: `Expand the Blog Theme in to the high level blog sections.
Blog Theme: ${resultEn}
Generate ${generateNum} blog sections.
Answer in JSON array:\n
[{
    "sectionTitle": "",
    "sectionMetaDescription": "",
}]\n\n`,
        temperature: 0.6,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
    }

    const answer = await answerAi(uid, model)

    if (answer?.error) {
        console.log('answerAi.error', answer.error)
        return { error: answer.error }
    }
    const jobWriter = await jobWrite(uid, pid, 'generateBlogSections', answer.text, answer.completion);

    if (jobWriter?.error) {
        console.log('jobWriter.error', answer.error)
        return { error: answer.error }
    }

    return answer.text;
}
