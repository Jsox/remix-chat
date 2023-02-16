import { Group, useMantineColorScheme, useMantineTheme, ActionIcon, Tooltip } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import { useColors } from '../../hooks/useColors';

export function SwitchToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const ruColorSchemeName = colorScheme === 'dark' ? 'светлую' : 'тёмную';
    const { primaryStyles } = useColors();

    return (
        <Group position="center" my="xl">
            <ActionIcon
                onClick={() => toggleColorScheme()}
                size="lg"
                sx={(theme) => ({
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                    color: colorScheme === 'dark' ? theme.colors.darkBlue[1] : theme.colors.darkBlue[8],
                })}
            >
                <Tooltip.Floating
                    width={220}
                    multiline
                    position="bottom"
                    label={'Сменить тему оформления на ' + ruColorSchemeName}
                    style={{ zIndex: 999, ...primaryStyles }}
                    // color={primaryBackgroundColor}
                >
                    <span>{colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}</span>
                </Tooltip.Floating>
            </ActionIcon>
        </Group>
    );
}
