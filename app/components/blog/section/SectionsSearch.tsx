import { TextInput, type TextInputProps, ActionIcon, useMantineTheme, Box } from '@mantine/core';
import { IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons-react';

function SectionsSearch(props: TextInputProps) {
    const { placeholder = 'Поиск' } = props;
    const theme = useMantineTheme();
    return (
        <Box sx={(theme) => ({
            margin: `${theme.spacing.lg} 0`
        })}>
        <TextInput
            icon={<IconSearch size="1.1rem" stroke={1.5} />}
            radius="xl"
            size="md"
            aria-label={placeholder}
            rightSection={
                <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                    {theme.dir === 'ltr' ? (
                        <IconArrowRight size="1.1rem" stroke={1.5} />
                    ) : (
                        <IconArrowLeft size="1.1rem" stroke={1.5} />
                    )}
                </ActionIcon>
            }
            placeholder={placeholder}
            rightSectionWidth={42}
            {...props}
            />
        </Box>
    )
}

export default SectionsSearch