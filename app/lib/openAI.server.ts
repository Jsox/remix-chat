const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv').config();
// const fs = require('fs');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class OpenAI {
    async tellMe(q: string, user: string, model: string = 'text-davinci-003') {
        const userLabel = `User${user}:`;
        const aiLabel = `Aisha:`;
        const greetingText =
            'The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.';
        const prefix = `\n\n${userLabel} `;
        const prompt = greetingText + prefix + q + `\n\n${aiLabel}`;

        console.log({ userLabel }, { prompt });
        const response = await openai.createCompletion({
            model: model,
            prompt,
            temperature: 0.9,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: [userLabel, aiLabel],
        });
        // let text = response.data.choices[0].text;
        // text = text.replace('+', ' ');
        // text = text.replace('\n', ' ');
        // text = text.replace("'", '');
        // console.log(text);
        console.log('data', JSON.stringify(response.data, null, 2));
        return response.data;
    }
}

export const AI = new OpenAI();
export const tellMeAi = AI.tellMe;
