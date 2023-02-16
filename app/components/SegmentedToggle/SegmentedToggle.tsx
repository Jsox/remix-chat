import { useMantineColorScheme, SegmentedControl, Group, Center, Box } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons';
import type { ColorScheme } from '@mantine/core';

export function SegmentedToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    console.log({ colorScheme });

    return (
        <Group position="center" my="xl">
            <SegmentedControl
                value={colorScheme}
                onChange={(value: ColorScheme) => toggleColorScheme(value)}
                data={[
                    {
                        value: 'light',
                        label: (
                            <Center>
                                <IconSun size={16} stroke={1.5} />
                                <Box ml={10}>Светлая</Box>
                            </Center>
                        ),
                    },
                    {
                        value: 'dark',
                        label: (
                            <Center>
                                <IconMoon size={16} stroke={1.5} />
                                <Box ml={10}>Темная</Box>
                            </Center>
                        ),
                    },
                ]}
            />
        </Group>
    );
}
