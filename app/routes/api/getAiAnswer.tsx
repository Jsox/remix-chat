import { type ActionArgs, json } from '@remix-run/node';
import { tellMeAi } from 'app/lib/openAI.server';

export async function action({ request }: ActionArgs) {
    const body = await request.formData();

    let query = body.get('text')?.toString();
    // let userFingerprint = body.get('userFingerprint')?.toString();

    const errorText = 'Извините, я ушла припудрить носик на некоторое время 😊<br />Скоро вернусь 😘';

    const fromAi = await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            resolve({ error: errorText + ' 🤷' });
        }, 15000);

        if (!query) {
            resolve({ error: 'Неверный запрос' });
            return;
        }

        // if (!userFingerprint) {
        //     resolve('Неверный userFingerprint');
        //     return;
        // }

        const fromAi = await tellMeAi(query, '1');
        // const usage = fromAi.usage;
        // const answer = fromAi?.choices[0]?.text || errorText;
        resolve(fromAi);
    });

    return json(fromAi);
}

// export default function getAi() {
//     return <span>?</span>;
// }
