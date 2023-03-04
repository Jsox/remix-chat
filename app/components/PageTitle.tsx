import { Box, Divider, Flex, Group, Title } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons';
import { useColors } from '../hooks/useColors';

export default function PageTitle({ title }: any) {
    const { gradientTitleColor } = useColors();
    return (
        <Group w={'100%'} mt={60} mb={30} pt={'xl'} pb={'sm'}>
            {/* <Divider py={'sm'} /> */}
            <IconGripVertical width={'10%'} />
            <Title
                w={'85%'}
                gradient={gradientTitleColor}
                variant={'gradient'}
                order={2}
                size={26}
                align={'center'}
                fw={700}
            >
                {title}
            </Title>
            {/* <Divider py={'sm'} /> */}
        </Group>
    );
}