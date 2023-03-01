export class AI21 {
    protected static key = process.env.AI21_API_KEY;
    static async run(prompt: string) {
        const stopSequences = ['###'];
        const res = await fetch('https://api.ai21.com/studio/v1/experimental/j1-grande-instruct/complete', {
            headers: {
                Authorization: `Bearer ${AI21.key}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                prompt,
                numResults: 1,
                maxTokens: 700,
                temperature: 0.7,
                topKReturn: 0,
                topP: 1,
                countPenalty: {
                    scale: 0,
                    applyToNumbers: false,
                    applyToPunctuations: false,
                    applyToStopwords: false,
                    applyToWhitespaces: false,
                    applyToEmojis: false,
                },
                frequencyPenalty: {
                    scale: 0,
                    applyToNumbers: false,
                    applyToPunctuations: false,
                    applyToStopwords: false,
                    applyToWhitespaces: false,
                    applyToEmojis: false,
                },
                presencePenalty: {
                    scale: 0,
                    applyToNumbers: false,
                    applyToPunctuations: false,
                    applyToStopwords: false,
                    applyToWhitespaces: false,
                    applyToEmojis: false,
                },
                stopSequences,
            }),
            method: 'POST',
        });

        const answer = await res.json();
        console.log(answer.completions[0].data.text);
        return answer.completions[0].data.text;
    }
}
