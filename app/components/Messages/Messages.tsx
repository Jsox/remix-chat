import { Box, Paper, Stack } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { type User, ChatMessage } from '@prisma/client';
import useBrowserAuth from 'app/hooks/useBrowserAuth';
import { useColors } from 'app/hooks/useColors';
import CommentHtml from '../Comment';
import InputChatForm from '../InputChatForm';
import { useContext, useEffect } from 'react';
import { DataContext } from 'app/data/DataContext';

interface IProps {
    // user: User;
    // chatMessages: ChatMessage[];
    // setChatMessages: () => void;
    // targetRefForScroll: HTMLElement;
}
export default function Messages() {
    const { user, chatMessages, setChatMessages } = useContext(DataContext);
    // const { user } = useBrowserAuth();

    const { targetRef, scrollIntoView } = useScrollIntoView(
        {
            duration: 1000,
            isList: false,
        },
        [chatMessages]
    );

    useEffect(() => {
        setTimeout(() => {
            scrollIntoView();
        }, 1000);
    }, [chatMessages]);

    const { header } = useColors();
    return (
        <Stack mih={'100%'} pos={'relative'} justify="space-between">
            {/* <p>{fromAi ? fromAi : 'Waiting...'}</p> */}
            <Box>
                {chatMessages.map((data, i) => (
                    <CommentHtml
                        position={data.messageBy === 'AI' ? 'right' : 'left'}
                        key={Math.random()}
                        index={i}
                        {...data}
                    />
                ))}
            </Box>
            <Paper
                withBorder
                shadow={'md'}
                py={'lg'}
                pl={'lg'}
                style={{
                    bottom: 0,
                    left: '0',
                    right: 'auto',
                    position: 'sticky',
                    width: '100%',
                    backgroundColor: header,
                }}
            >
                <InputChatForm
                    setChatMessages={setChatMessages}
                    // formValue={formValue}
                    // setFormValue={setFormValue}
                    // onTyping={onTyping}
                    // onSubmit={onSubmit}
                    // formValue={formValue}
                    // setFormValue={setFormValue}
                />
                <span ref={targetRef}></span>
            </Paper>
        </Stack>
    );
}
