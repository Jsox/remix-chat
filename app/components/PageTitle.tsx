import { Box, Divider, Flex, Group, Title } from '@mantine/core';
import { IconGripVertical } from '@tabler/icons';

export default function PageTitle({ title }: any) {
    return (
        <Group w={'100%'} mt={80} mb={30} pt={'xl'} pb={'sm'}>
            {/* <Divider py={'sm'} /> */}
            <IconGripVertical width={'10%'} />
            <Title
                w={'85%'}
                gradient={{ from: 'white', to: 'blue' }}
                variant={'gradient'}
                order={2}
                size={'h2'}
                align={'center'}
                fw={500}
            >
                {title}
            </Title>
            {/* <Divider py={'sm'} /> */}
        </Group>
    );
}