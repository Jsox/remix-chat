import {
    createStyles,
    Text,
    Avatar,
    TypographyStylesProvider,
    Paper,
    Flex,
    ActionIcon,
    Tooltip,
    Transition,
} from '@mantine/core';
import { ClientOnly } from 'remix-utils';
import ChatMessageSkeleton from './ChatMessageSkeleton';
import { useColors } from './../hooks/useColors';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconThumbUp } from '@tabler/icons';
import { useEffect, useRef, useState } from 'react';
import { useTime } from 'app/hooks/useTime';
import { ChatMessage } from '@prisma/client';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
        marginBottom: `${theme.spacing.sm}px`,
        width: '100%',
        [theme.fn.largerThan('sm')]: {
            maxWidth: '80%',
            marginBottom: `${theme.spacing.md}px`,
            padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
            width: 'auto',
        },
    },

    text: {
        paddingLeft: 25,
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.lg,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

interface CommentHtmlProps extends ChatMessage {
    user: {
        name: string;
        avatar?: string;
    };
    position?: 'left' | 'right';
    index?: number;
    isNew?: boolean;
}

export default function CommentHtml(data: CommentHtmlProps) {
    const { messageBy, isNew = false, created, text, user, position = 'left', index = 1 } = data;
    const { classes } = useStyles();
    const { commentStyles, commentStylesNegative } = useColors();
    const clipboard = useClipboard({ timeout: 1000 });
    const textField = useRef();
    // const [mounted, setMounted] = useState(false);
    const timeAgo = useTime(created);

    const copyStyles = {
        top: 5,
    };
    if (position == 'right') {
        copyStyles.left = 5;
    } else {
        copyStyles.right = 5;
    }
    // const hydrated = useHydrated();
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        // if (!isNew) {
        //     setMounted(true);
        // }
        setTimeout(() => {
            setMounted(true);
        }, index * 10);
        // setMounted(true);
    });
    return (
        <Transition mounted={mounted} transition="pop-bottom-left" duration={500}>
            {(styles) => (
                <Flex style={{ ...styles }} justify={position == 'left' ? 'start' : 'end'}>
                    <Paper
                        pos={'relative'}
                        style={position == 'left' ? { ...commentStyles } : { ...commentStylesNegative }}
                        shadow={'sm'}
                        withBorder
                        radius="md"
                        className={classes.comment}
                    >
                        <Flex
                            gap={20}
                            justify={position}
                            align={'center'}
                            direction={position == 'right' ? 'row-reverse' : 'row'}
                            sx={(theme) => ({
                                [theme.fn.smallerThan('sm')]: {
                                    flexDirection: 'column',
                                },
                            })}
                        >
                            <Avatar
                                color={
                                    position == 'right' ? commentStylesNegative.borderColor : commentStyles.borderColor
                                }
                                size={'lg'}
                                src={messageBy !== 'AI' ? user?.avatar || null : null}
                                alt={user.name}
                                radius="xl"
                            >
                                {messageBy === 'AI' ? 'AI' : user.name.substring(0, 2)}
                            </Avatar>
                            <Flex justify={'center'} direction={'column'} align={position == 'right' ? 'end' : 'start'}>
                                <Text size="lg">{messageBy === 'AI' ? 'Аиша' : user.name}</Text>
                                {/* <ClientOnly fallback={<Text size="xs">...</Text>}>
                            {() => <Text size="xs">{timeAgo}</Text>}
                        </ClientOnly> */}
                                <Text size="xs">{timeAgo}</Text>
                            </Flex>
                            <Flex w={'fit-content'} direction={'row'} justify={position == 'left' ? 'end' : 'start'}>
                                <Tooltip label="Скопировать в буфер обмена">
                                    <ActionIcon
                                        aria-label="Скопировать в буфер обмена"
                                        pos={'absolute'}
                                        size="sm"
                                        style={{ ...copyStyles }}
                                        onClick={() => {
                                            clipboard.copy(textField.current?.innerText);
                                        }}
                                    >
                                        {clipboard.copied ? <IconThumbUp size={26} /> : <IconCopy size={26} />}
                                    </ActionIcon>
                                </Tooltip>
                            </Flex>
                            <TypographyStylesProvider pl={0} pt={0} c={commentStyles.color} className={classes.text}>
                                <div
                                    ref={textField}
                                    className={classes.content}
                                    dangerouslySetInnerHTML={{ __html: text }}
                                />
                            </TypographyStylesProvider>
                        </Flex>
                    </Paper>
                </Flex>
            )}
        </Transition>
    );
}
