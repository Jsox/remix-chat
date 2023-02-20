import { type ActionArgs, MetaFunction, json } from '@remix-run/node';
import Layout from '../layouts/Layout';
import { useActionData } from '@remix-run/react';
import Messages from 'app/components/Messages/Messages';
import { OpenAI } from 'app/lib/ai.server';
import { useEffect } from 'react';
import { authenticator } from '../services/auth.server';
import { useScrollIntoView } from '@mantine/hooks';

export const meta: MetaFunction = () => ({
    title: `ChatGPT по-русски`,
});

// export async function loader({ request, context }: LoaderArgs) {
//     // const user = auth(request);

//     const user = (await authenticator.isAuthenticated(request)) || null;

//     // console.log({ user, request });

//     if (user?.id) {
//         return json({
//             messages: await getUserMessages(user.id),
//         });
//     }
//     return {
//         messages: [],
//     };
// }
export async function action({ request }: ActionArgs) {
    const user = (await authenticator.isAuthenticated(request)) || null;
    const body = await request.formData();
    const query = body.get('question')?.toString();
    if (!user) {
        return json({ fromAi: 'Нужно авторизоваться' });
    }
    if (!query?.trim()) {
        return json({ fromAi: 'Неверный запрос' });
    }

    const Ai = new OpenAI({ userId: user.id, debug: true, model: 'text-davinci-003' });

    const fromAi = await Ai.get(query);

    // const fromAi = await tellMeAi(query, 7);

    return json(fromAi);
}

export default function Chat() {
    const fromAi = useActionData();
    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 500,
        duration: 3000,
    });

    return (
        <Layout>
            {/* <code>{JSON.stringify(fromAi, null, 2)}</code> */}
            <Messages />
            <span ref={targetRef}></span>
        </Layout>
    );
}
