export const AiModels = (query: string, model: string = 'text-davinci-003', generateNum: number) => {
    return {
        test: {
            model: model,
            prompt: `${query}`,
            temperature: 0.6,
            max_tokens: 25,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stream: false,
        },
        generateBlogSections: {
            model: model,
            prompt: `Expand the blog Theme in to high level blog sections. Blog Theme: ${query}\nGenerate ${generateNum} pcs.\nAnswer in JSON array:\n
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
            model: model,
            prompt: `Expand the blog Section in to blog topics.\nBlog Section: ${query}\nGenerate ${generateNum} pcs.\nAnswer in JSON array:\n
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
            model: model,
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
};
