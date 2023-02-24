import { TextInput, type TextInputProps, ActionIcon, useMantineTheme } from '@mantine/core';
import { IconNewSection, IconPlus } from '@tabler/icons';

export default function CreateProjectForm(props: TextInputProps) {
    const theme = useMantineTheme();

    return (
        <TextInput
            minLength={5}
            maxLength={50}
            icon={<IconNewSection size={30} stroke={1.5} />}
            radius="xl"
            size="lg"
            rightSection={
                <ActionIcon
                    loading={props.isLoading}
                    type="submit"
                    aria-label={'Создать новый проект'}
                    mr={8}
                    size={42}
                    radius="xl"
                    color={theme.primaryColor}
                    variant="filled"
                >
                    <IconPlus size={26} stroke={1.5} />
                </ActionIcon>
            }
            aria-label={'Название нового проекта'}
            placeholder="Создать новый проект"
            rightSectionWidth={42}
            {...props}
        />
    );
}
