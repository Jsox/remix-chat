import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { useEventSource } from "remix-utils";

import { emitter } from "app/services/emitter";
import Layout from 'app/layouts/Layout';
import { Button, TextInput } from "@mantine/core";
import { useListState } from "@mantine/hooks";

export async function action({ request }: LoaderArgs) {
    const formData = await request.formData();
    const message = formData.get("message");
    emitter.emit("message", message);
    return json({ message });
}

export default function PublicChat() {
    const $form = useRef<HTMLFormElement>(null);
    const { key } = useLocation();
    useEffect(
        function clearFormOnSubmit() {
            $form.current?.reset();
        },
        [key]
    );

    const [messages, handlersMessages] = useListState<string>();
    const lastMessage = useEventSource("/sse/chat");
    useEffect(
        function saveMessage() {
            if (typeof lastMessage === "string") {
                handlersMessages.append(lastMessage)
            }
        },
        [lastMessage]
    );
    return (
        <Layout>
            <Form ref={$form} method="post" >
                <TextInput name="message" />
                <Button type={'submit'}>Send</Button>
            </Form>

            <ul>
                {
                    messages.map((message) => (
                        <li key={message} > {message} </li>
                    ))
                }
            </ul>
        </Layout>
    )
}