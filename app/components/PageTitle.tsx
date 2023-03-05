import { Box, Divider, Flex, Group, Title } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons';
import { useColors } from '../hooks/useColors';
import useBreakpoints from '../hooks/useBreakpoint';

export default function PageTitle({ title }: any) {
    const { gradientTitleColor } = useColors();
    const { isXs } = useBreakpoints()
    return (
        <Group w={'100%'} mt={{ base: 20, sm: 40, lg: 55 }} mb={30} pt={'xl'} pb={'sm'}>
            {/* <Divider py={'sm'} /> */}
            <IconGripVertical width={'10%'} />
            <Title
                w={'85%'}
                gradient={gradientTitleColor}
                variant={'gradient'}
                order={2}
                size={isXs ? 20 : 26}
                align={'center'}
                fw={700}
            >
                {title}
            </Title>
            {/* <Divider py={'sm'} /> */}
        </Group >
    );
}