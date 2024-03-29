import { TextInput, type TextInputProps, ActionIcon } from '@mantine/core';
import { useFocusTrap } from '@mantine/hooks';
import { IconNewSection, IconPlus, IconStackPush } from '@tabler/icons';
import { useColors } from '../../hooks/useColors';

interface ICreateProjectForm extends TextInputProps {
    isloading: string;
}
export default function CreateProjectForm(props: ICreateProjectForm) {
    const focusTrapRef = useFocusTrap();
    const { mainGradient } = useColors();
    return (
        <TextInput
            ref={focusTrapRef}
            minLength={5}
            maxLength={60}
            icon={<IconStackPush size={36} stroke={1.5} />}
            radius="xl"
            size="xl"
            rightSection={
                <ActionIcon
                    loading={!!props.isloading}
                    type="submit"
                    aria-label={'Создать новый проект'}
                    mr={18}
                    mt={-2}
                    size={46}
                    radius="xl"
                    variant={'gradient'}
                    gradient={mainGradient}
                    // bg={'primary'}
                    // c={primaryTextColor}
                >
                    <IconPlus size={26} stroke={1.5} />
                </ActionIcon>
            }
            aria-label={'Название нового проекта'}
            placeholder="Создать новый проект Блога"
            rightSectionWidth={42}
            {...props}
        />
    );
}
