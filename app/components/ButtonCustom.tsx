import { UnstyledButton, Group, Avatar, Text, rem, createStyles } from '@mantine/core';
import type { TablerIcon } from '@tabler/icons';

export interface ButtonCustomProps {
    Icon?: TablerIcon;
    avatarColor?: string;
    avatarText: string;
    title: string;
    desc: string;
}
const useStyles = createStyles((theme) => {
    return {
        root: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
            padding: `${rem(8)} ${rem(18)}`,
            borderRadius: theme.radius.md,
            border: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[3]}`,
            transition: 'all .1s ease',
            boxShadow: theme.shadows.md,
            '&:hover': {
                color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.dark[9],
                boxShadow: theme.shadows.sm,
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
                transform: 'scale(1.01)',
            }
        }
    }
})
export default function ButtonCustom(props: ButtonCustomProps) {
    const { classes } = useStyles();
    const { Icon, avatarColor = 'blue', avatarText, title, desc, ...others } = props
    return (
        <UnstyledButton  className={classes.root} {...others}>
            <Group>
                <Avatar size={rem(40)} color={avatarColor}><Text component={Icon} /></Avatar>
                <div>
                    <Text>{title}</Text>
                    <Text size="xs">{desc}</Text>
                </div>
            </Group>
        </UnstyledButton>
    );
}