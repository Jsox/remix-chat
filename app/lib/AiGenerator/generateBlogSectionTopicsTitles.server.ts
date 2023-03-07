
import type { CompletionRequest } from '../../types/index';
import { answerAi, type CompletionResponseOrError } from './AiFetcher.server';

export async function generateBlogSectionTopicsTitles(uid: number, opts: { blogTheme?: string, generateNum?: number, blogSection: string }): CompletionResponseOrError {
    const { blogSection, blogTheme, generateNum = 3, } = opts;

    let model: CompletionRequest = {
        model: 'text-davinci-003',
        prompt: `Expand the blog Section in to the blog Titles.
${blogTheme ? `Blog Theme: ${blogTheme}` : ''}
Blog Section: ${blogSection}
Generate ${generateNum} blog Titles.
Answer in JSON array:\n
[{
    "topicTitle": "",
    "topicMetaDescription": "",
}]\n\n`,
        temperature: 0.8,
        max_tokens: 2000,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        stream: false,
    }

    return await answerAi(uid, model)
}
