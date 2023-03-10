import { Box, Avatar, Tooltip, ActionIcon, Text, Highlight } from "@mantine/core"
import { IconTrashOff, IconArrowUpCircle } from "@tabler/icons"
import type { Section } from '@prisma/client';

function InactiveSectionBox({ section, markedText }: { section: Section, markedText?: string }) {
    const sectionFromTrash = (id: number) => {
        console.log('section from trash', id)
    }
    return (
        <Box sx={(theme) => ({
            display: 'flex',
            marginBottom: theme.spacing.md,
            padding: theme.spacing.lg,
            boxShadow: theme.shadows.xs,
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            borderRadius: theme.radius.md,
            gap: theme.fontSizes.lg,
            transition: 'all .15s ease-out',
            '&:hover': {
                boxShadow: theme.shadows.sm,
                backgroundColor:
                    theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[1],
                transform: 'scale(1.01)',
            },
        })} p={'lg'} w={'100%'}>

            <Avatar size={56} color={'red'}><IconTrashOff /></Avatar>
            <Box w={'100%'}>
                
                <Text size={'lg'}>
                    <Highlight highlight={markedText || ''}>
                        {section.sectionTitle}
                    </Highlight>
                </Text>
                <Text size="md" color="dimmed">
                    <Highlight highlight={markedText || ''}>
                        {section.sectionMetaDescription}
                    </Highlight>
                </Text>
            </Box>
            <Tooltip
                color={'blue'}
                position="top"
                withArrow
                label={'Восстановить Раздел'}
                style={{ zIndex: 9999 }}
            >
                <ActionIcon onClick={() => sectionFromTrash(section.id)} color={'blue'} variant={'filled'} style={{ transition: 'all .3 ease' }} size="lg">
                    <IconArrowUpCircle size="1.25rem" />
                </ActionIcon>
            </Tooltip>

        </Box>
    )
}

export default InactiveSectionBox