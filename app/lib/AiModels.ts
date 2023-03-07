import { type Job } from "./AiGenerator/generateBlogSections.server";
import { type CompletionRequest } from '../types/index';



export interface AiModelOpts {
    job: Job;
    query: string;
    model?: string;
    generateNum?: number;
    blogTheme?: string;
    blogSection?: string;
}

export function AiModel(opts: AiModelOpts): CompletionRequest | null {
    const { blogTheme, blogSection, job, query, model = 'text-davinci-003', generateNum = 3 } = opts

    let aiModel = null;
    switch (job) {
        case 'generateBlogSections':
            aiModel = {
                model: model,
                prompt: `Expand the Blog Theme in to the high level blog sections.
Blog Theme: ${query}
Generate ${generateNum} blog sections.
Answer in JSON array:\n
[{
    "sectionTitle": "",
    "sectionMetaDescription": "",
    "sectionSlug": ""
}]\n\n`,
                temperature: 0.6,
                max_tokens: 2000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            }

        case 'generateBlogSectionTopicsTitles':
            aiModel = {
                model: model,
                prompt: `Expand the blog Section in to the blog Titles.
Blog Theme: ${blogTheme}
Blog Section: ${query}
Generate ${generateNum} blog Titles.
Answer in JSON array:\n
[{
    "topicTitle": "",
    "topicMetaDescription": "",
    "topicSlug": "",
}]\n\n`,
                temperature: 0.8,
                max_tokens: 2000,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
                stream: false,
            }

        case 'generateBlogPostByTitle':
            aiModel = {
                model: model,
                prompt: `Expand the Blog Post title in to a detailed professional, witty and clever Blog Post.
Blog Theme: ${blogTheme}
Blog Section: ${blogSection}
Blog Post title: ${query}\n
Answer in JSON format:\n
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
            }

        default:
            break;

    }
    return aiModel;

}

