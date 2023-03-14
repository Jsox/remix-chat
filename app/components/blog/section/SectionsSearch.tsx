import { TextInput, type TextInputProps, ActionIcon, useMantineTheme, Box } from '@mantine/core';
import { IconX } from '@tabler/icons';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

function SectionsSearch(props: TextInputProps) {
    const { placeholder = 'Поиск', value, onChange } = props;
    const theme = useMantineTheme();

    const clearInput = () => {
        onChange('')
    }

    return (
        <Box sx={(theme) => ({
            margin: `${theme.spacing.lg} 0`
        })}>
            <TextInput
                icon={<IconSearch size="2rem" stroke={1.5} />}
                radius="xl"
                size="lg"
                aria-label={placeholder}
                rightSection={
                    <ActionIcon onClick={clearInput} disabled={!value.length} mr={10} size={40} radius="xl" color={theme.primaryColor} variant="filled">
                        <IconX size="1.5rem" stroke={1.5} />
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