import { Code, Modal, useMantineTheme } from '@mantine/core';
import { useOutletContext } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { Prism } from '@mantine/prism';
import { useEventSource } from 'remix-utils';
import { useDisclosure } from '@mantine/hooks';

function EventStreamer(setStateFunction?: any | null) {
    const isStated = typeof setStateFunction === 'function';
    const { uniqueUserString }: any = useOutletContext();
    let eventStreamPersonalMessage = useEventSource(
        `/sse/user/${uniqueUserString}`
    );

    const theme = useMantineTheme();
    const [opened, { open, close }] = useDisclosure(false);

    const [fullText, setFullText] = useState('');

    useEffect(() => {
        if (
            eventStreamPersonalMessage &&
            !eventStreamPersonalMessage.includes('[DONE]')
        ) {
            let message = `${eventStreamPersonalMessage.replace(/\\n/g, '\n')}`;

            if (isStated) {
                setStateFunction((prev: string) => `${prev}${message}`);
            } else {
                setFullText((prev) => `${prev}${message}`);
            }

            if (!opened) {
                open();
            }
        }
        if (
            eventStreamPersonalMessage &&
            eventStreamPersonalMessage.includes('[DONE]')
        ) {
            setTimeout(() => {
                if (opened) close();
            }, 3000);
            return () => {};
        }
    }, [eventStreamPersonalMessage, setStateFunction, isStated, open, close, opened]);

    if (isStated) return null;

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Генерирую..."
            withCloseButton={true}
            centered
            size={'auto'}
            overlayProps={{
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[9]
                        : theme.colors.gray[2],
                opacity: 0.55,
                blur: 3,
            }}
        >
            <Code color="blue">{`${fullText}`}</Code>
            {/* <Prism
                copyLabel="Скопировать в буфер обмена"
                copiedLabel="Скопировано"
                withLineNumbers
                language="json"
                children={`${fullText}`}
            /> */}
        </Modal>
    );
}

export default EventStreamer;
