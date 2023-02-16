import { createStyles, Text, Avatar, TypographyStylesProvider, Paper, Flex, ActionIcon, Tooltip } from '@mantine/core';
import { ClientOnly } from 'remix-utils';
import ChatMessageSkeleton from './ChatMessageSkeleton';
import { useColors } from './../hooks/useColors';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconThumbUp } from '@tabler/icons';
import { useRef } from 'react';
import { useTime } from 'app/hooks/useTime';

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

    body: {
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

interface CommentHtmlProps {
    postedAt: string;
    body: string;
    author: {
        name: string;
        image?: string;
    };
    position?: 'left' | 'right';
    index?: number;
}

export function CommentHtml({ postedAt, body, author, position = 'left', index = 1 }: CommentHtmlProps) {
    const { classes } = useStyles();
    const { commentStyles, commentStylesNegative } = useColors();
    const clipboard = useClipboard({ timeout: 1000 });
    const textField = useRef();
    // const [mounted, setMounted] = useState(false);
    const { timeAgo } = useTime(postedAt);

    const copyStyles = {
        top: 7,
    };
    if (position == 'right') {
        copyStyles.left = 7;
    } else {
        copyStyles.right = 7;
    }
    // const hydrated = useHydrated();
    // useEffect(() => {
    // setTimeout(() => {
    // 	setMounted(true);
    // }, 50 * index);
    // 	setMounted(true);
    // }, []);
    return (
        // <Transition mounted={mounted} transition='scale-y' duration={300} timingFunction='ease'>
        // 	{(styles) => (
        <Flex justify={position == 'left' ? 'start' : 'end'}>
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
                        color={position == 'right' ? commentStylesNegative.borderColor : commentStyles.borderColor}
                        size={'lg'}
                        src={author?.image || null}
                        alt={author.name}
                        radius="xl"
                    >
                        {!author.image && author.name.substring(0, 2)}
                    </Avatar>
                    <Flex justify={'center'} direction={'column'} align={position == 'right' ? 'end' : 'start'}>
                        <Text size="lg">{author.name}</Text>
                        {/* <ClientOnly fallback={<Text size="xs">...</Text>}>
                            {() => <Text size="xs">{timeAgo}</Text>}
                        </ClientOnly> */}
                        <Text size="xs">{postedAt}</Text>
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
                    <TypographyStylesProvider pl={0} pt={0} c={commentStyles.color} className={classes.body}>
                        <div ref={textField} className={classes.content} dangerouslySetInnerHTML={{ __html: body }} />
                    </TypographyStylesProvider>
                </Flex>
            </Paper>
        </Flex>
        // 	)}
        // </Transition>
    );
}
