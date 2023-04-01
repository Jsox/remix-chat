import {
    createStyles,
    Text,
    Avatar,
    Group,
    TypographyStylesProvider,
    Paper,
    rem,
} from '@mantine/core';
import type { ChatMessage as TChatMessage, User } from '@prisma/client';
import { getTimeFromNow } from 'app/hooks/useTime';
import { useHydrated } from 'remix-utils';

const useStyles = createStyles((theme) => ({
    comment: {
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },
    answerTo: {
        backgroundColor: theme.colors.gray[5],
        padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    },

    body: {
        paddingLeft: rem(54),
        paddingTop: theme.spacing.sm,
        fontSize: theme.fontSizes.sm,
    },

    content: {
        '& > p:last-child': {
            marginBottom: 0,
        },
    },
}));

interface TUChatMessage extends TChatMessage {
    User: User;
}
interface ChatMessageProps {
    message: TUChatMessage;
    direction: 'left' | 'right';
    answerTo?: TUChatMessage | null;
    dimmed?: boolean;
}

export function ChatMessage({
    message,
    direction = 'left',
    answerTo = null,
    dimmed = false,
}: ChatMessageProps) {
    const hydrated = useHydrated();
    const { User, created, text } = message;
    const { name, avatar } = User;
    const timeFromNow = getTimeFromNow(created);

    const { classes } = useStyles();
    return (
        <Paper withBorder radius="xl" className={classes.comment}>
            <Group>
                <Avatar src={avatar} alt={name || '[аноним]'} radius="xl" />
                <div>
                    <Text fz="sm">{name}</Text>
                    <Text fz="xs" c="dimmed">
                        {!!hydrated && timeFromNow}
                    </Text>
                </div>
            </Group>
            <TypographyStylesProvider className={classes.body}>
                {!!answerTo && (
                    <ChatMessage
                        message={answerTo}
                        direction={direction}
                        dimmed={true}
                    />
                )}
                <Text
                    className={classes.content}
                    dangerouslySetInnerHTML={{ __html: text }}
                />
            </TypographyStylesProvider>
        </Paper>
    );
}
