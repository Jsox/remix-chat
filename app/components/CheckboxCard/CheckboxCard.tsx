import { UnstyledButton, Checkbox, Text, createStyles } from '@mantine/core';
import { useUncontrolled } from '@mantine/hooks';
import { useColors } from 'app/hooks/useColors';

const useStyles = createStyles((theme) => ({
    button: {
        display: 'flex',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0],
        width: '100%',
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[3]}`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        transition: 'all 0.3s ease',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[6] : theme.colors.darkBlue[2],
        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[1],
        },
    },
}));

interface CheckboxCardProps {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?(checked: boolean): void;
    title: React.ReactNode;
    description: React.ReactNode;
}

export function CheckboxCard({
    checked,
    defaultChecked,
    onChange,
    title,
    description,
    className,
    ...others
}: CheckboxCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxCardProps>) {
    const { classes, cx } = useStyles();

    const [value, handleChange] = useUncontrolled({
        value: checked,
        defaultValue: defaultChecked,
        finalValue: false,
        onChange,
    });

    return (
        <UnstyledButton {...others} onClick={() => handleChange(!value)} className={cx(classes.button, className)}>
            <Checkbox
                checked={value}
                onChange={() => {}}
                tabIndex={-1}
                size="md"
                mr="xl"
                styles={{
                    input: { cursor: 'pointer' },
                }}
            />

            <div>
                <Text weight={500} mb={7} sx={{ lineHeight: 1 }}>
                    {title}
                </Text>
                <Text size="sm" color="dimmed">
                    {description}
                </Text>
            </div>
        </UnstyledButton>
    );
}
