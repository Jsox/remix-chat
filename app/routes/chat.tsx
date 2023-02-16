import { json, type LoaderArgs, MetaFunction } from '@remix-run/node';
import { useState, useEffect } from 'react';
import Layout from '../layouts/Layout';
import { CommentHtml } from '../components/Comment';
import { Box, Stack, Paper } from '@mantine/core';
import InputChatForm from '../components/InputChatForm';
import { useScrollIntoView } from '@mantine/hooks';
import { mockChatMess } from '../data/mock';
import { useColors } from '../hooks/useColors';
import useBreakpoints from 'app/hooks/useBreakpoint';
import { useActionData, useFetcher, useTransition } from '@remix-run/react';
import Messages from 'app/components/Messages/Messages';
import useBrowserAuth from 'app/hooks/useBrowserAuth';
// import { useHydrated } from 'remix-utils';

export const meta: MetaFunction = () => ({
    title: `ChatGPT по-русски`,
});

// export async function loader({ request }: LoaderArgs) {
//     // console.log({ request });
//     return json({ FP });
// }

export default function Index() {
    const { user } = useBrowserAuth();
    const fromAi = useActionData();
    console.log({ fromAi });

    // const [chatMessages, setChatMessages] = useState([]);
    // setChatMessages(mockChatMess);

    useEffect(() => {
        setTimeout(() => {
            scrollIntoView();
        }, 1000);
    }, [chatMessages]);

    const { scrollIntoView, targetRefForScroll } = useScrollIntoView<HTMLDivElement>({ offset: 60, duration: 1000 });

    const defaultAuthor = {
        name: 'Евгений Zedovitch',
    };

    return (
        <Layout>
            {user.id && <Messages user={user} chatMessages={mockChatMess} targetRefForScroll={targetRefForScroll} />}
        </Layout>
    );
}
