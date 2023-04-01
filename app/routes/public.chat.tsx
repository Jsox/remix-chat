import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
    Form,
    useActionData,
    useLoaderData,
    useLocation,
    useOutletContext,
} from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { useEventSource } from 'remix-utils';

import { emitter } from 'app/services/emitter';
import Layout from 'app/layouts/Layout';
import { Button, TextInput } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { Censure } from 'app/lib/Censure';
import auth from 'app/services/auth.server';
import type { ChatMessage, User } from '@prisma/client';
import { errorHandler, sendToTelegram } from 'app/lib/AiGenerator/errorHandler';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle } from '@tabler/icons';
import prisma from 'prisma/client';

export async function loader({ request }: LoaderArgs) {
    // const user: User | null = await auth(request);

    const chatMessages: ChatMessage[] = await prisma.chatMessage.findMany({
        orderBy: {
            created: 'desc',
        },
        take: 100,
        where: {
            conversationId: 'publicChat',
        },
    });
    return json({ chatMessages });
}

export async function action({ request }: LoaderArgs) {
    const user: User | null = await auth(request);
    if (!user) {
        return errorHandler({
            message: 'Нужно авторизоваться',
            from: 'pub chat action',
            returnJson: true,
        });
    }
    const formData = await request.formData();
    let message = (await formData.get('message')) || '';
    message = message.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;');

    if (!message) {
        return errorHandler({
            message: 'Плохое сообщение... пустое',
            from: 'pub chat action',
            returnJson: true,
        });
    }
    if (Censure.isBad(message)) {
        sendToTelegram({
            from: 'pub chat action',
            data: {
                badWords: message,
                user,
            },
        });
        return json({
            error: `Плохое слово в сообщении, скрипт забанит автоматически, при повторе 🤷‍♂️

            Но мы его получили, если это ошибка - мы исправимся, если нет - исправляйтесь Вы 😉`,
        });
    }
    message = `${user.name}: ${message}`;
    emitter.emit('message', message);
    return json({ message });
}

export default function PublicChat() {
    const $form = useRef<HTMLFormElement>(null);
    // const { key } = useLocation();
    const data = useActionData();

    // const { user } = useOutletContext();

    const { chatMessages } = useLoaderData();

    useEffect(() => {
        if (data?.error) {
            showNotification({
                id: 'chatError',
                title: 'Ошибка!',
                message: data.error,
                color: 'red',
                icon: <IconAlertCircle />,
                autoClose: 10000
            });
        }
        if (data && !data?.error) {
            $form.current?.reset();
        }
    }, [data]);

    const [messages, handlersMessages] =
        useListState<ChatMessage>(chatMessages);

    let lastMessage = useEventSource('/sse/chat');
    useEffect(
        function saveMessage() {
            if (typeof lastMessage === 'string') {
                let message = lastMessage
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');

                handlersMessages.append(message);
            }
        },
        [lastMessage]
    );
    return (
        <Layout>
            <Form ref={$form} method="post">
                <TextInput min={3} max={100} name="message" />
                <Button type={'submit'}>Send</Button>
            </Form>

            <ul>
                {messages.map((message) => (
                    <li key={message}> {message} </li>
                ))}
            </ul>
        </Layout>
    );
}
