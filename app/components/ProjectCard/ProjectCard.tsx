import { UnstyledButton, Text, createStyles, Box, Title } from '@mantine/core';
import { NavLink } from '@remix-run/react';

const useStyles = createStyles((theme) => ({
    button: {
        display: 'flex',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0],
        width: '100%',
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[3]}`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        transition: 'all 0.3s ease',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[6] : theme.colors.darkBlue[0],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[1],
        },
    },
}));

interface ProjectCardProps {
    title: React.ReactNode;
    created: Date;
    url: string;
    description?: React.ReactNode | null;
}

export function ProjectCard({
    title,
    description = null,
    created,
    url,
    className,
    ...others
}: ProjectCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof ProjectCardProps>) {
    const { classes, cx } = useStyles();

    return (
        <UnstyledButton
            aria-label={'Проект: ' + title}
            to={url}
            component={NavLink}
            {...others}
            className={cx(classes.button, className)}
        >
            <Box
                w={'100%'}
                tabIndex={-1}
                mr="xl"
                styles={{
                    input: { cursor: 'pointer' },
                }}
            >
                <Title align="center" fw={300} order={3} size={'h3'} mb={7} sx={{ lineHeight: 1 }}>
                    {title}
                </Title>
                <p>{new Date(created).toLocaleDateString()}</p>
                {description && (
                    <Text size="sm" color="dimmed">
                        {description}
                    </Text>
                )}
            </Box>
        </UnstyledButton>
    );
}
