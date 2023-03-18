import {
    TextInput,
    type TextInputProps,
    ActionIcon,
    useMantineTheme,
    Box,
} from '@mantine/core';
import { IconX } from '@tabler/icons';
import { IconSearch } from '@tabler/icons-react';
import { useColors } from 'app/hooks/useColors';
import { useEffect, useRef, useState } from 'react';

interface SSProps extends TextInputProps {
    disabledbutton: number;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}
function SectionsSearch(props: TextInputProps) {
    const { placeholder = 'Поиск', value, onChange, disabledbutton } = props;
    const theme = useMantineTheme();
    const { mainGradient } = useColors();


    const clearInput = () => {
        onChange('');
    };

    return (
        <Box
            sx={(theme) => ({
                margin: `${theme.spacing.lg} 0`,
            })}
        >
            <TextInput
                icon={<IconSearch size="2rem" stroke={1.5} />}
                radius="xl"
                size="lg"
                aria-label={placeholder}
                rightSection={
                    <ActionIcon
                        onClick={clearInput}
                        disabled={value.length < 3}
                        mr={10}
                        size={40}
                        radius="xl"
                        // color={theme.primaryColor}
                        variant={'gradient'}
                        gradient={mainGradient}
                    >
                        <IconX size="1.5rem" stroke={1.5} />
                    </ActionIcon>
                }
                placeholder={placeholder}
                rightSectionWidth={42}
                {...props}
            />
        </Box>
    );
}

export default SectionsSearch;
