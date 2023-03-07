import { Accordion, type AccordionControlProps, ActionIcon, Box, Title, Text, createStyles, rem } from "@mantine/core";
import type { Section } from "@prisma/client";
import { IconBasketOff, IconCross, IconDots } from "@tabler/icons";
import InfoMessage from "../InfoMessage";
import SectionEditForm from "./SectionEditForm";

const useStyles = createStyles((theme) => ({
    root: {

    },
    item: {
        border: `${rem(1)} solid ${theme.colorScheme === 'dark'
            ? theme.colors.darkBlue[9]
            : theme.colors.gray[2]
            }`,
        position: 'relative',
        zIndex: 0,
        transition: 'all 0.3s ease',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[6]
                : theme.colors.gray[1],

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.darkBlue[8]
                    : theme.colors.gray[2],
            transform: 'scale(1.01)',

        },

        '&[data-active]': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.darkBlue[8]
                    : theme.colors.gray[2],
            border: `${rem(1)} solid ${theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[9]
                : theme.colors.gray[2]
                }`,
            transform: 'scale(1.03)',
            boxShadow: theme.shadows.md,
            borderRadius: theme.radius.lg,
            zIndex: 1,
        },
    },

    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));
export default function SectionsAccordion({ sections }: { sections: Section[] }) {
    const { classes } = useStyles();
    const onChange = (v) => {
        console.log(v);

    }
    return (
        sections.length !== 0 ?
            <Accordion className={classes.root} classNames={classes} variant={'separated'} chevronPosition="left" mx="auto">
                {
                    sections.map(section => (
                        <Accordion.Item key={section.id.toString()} onChange={onChange} id={section.id.toString()} px={{ xs: 'xs', md: 'md', lg: 'lg' }} value={section.id.toString()}>
                            <AccordionControl maw={'calc(100% - 80px)'}>
                                <>
                                    <Title mb={'sm'} order={4}>{section.sectionTitle}</Title>
                                    <Text truncate={'end'} c={'dimmed'}>{section.sectionMetaDescription}</Text>
                                </>
                            </AccordionControl>
                            <Accordion.Panel>{<SectionEditForm section={section} />}</Accordion.Panel>
                        </Accordion.Item>
                    ))
                }
            </Accordion>
            : <InfoMessage title="Пока нет разделов" text={'У Вас пока нет сгенерированных разделов для для этого Блога. Сгенерируйте нажав на кнопку'} />
    )
}

function AccordionControl(props: AccordionControlProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control {...props} />
            <ActionIcon size="lg">
                <IconDots size="1rem" />
            </ActionIcon>
            <ActionIcon c={'gray.0'} bg={'red.9'} size="lg">
                <IconBasketOff size="1rem" />
            </ActionIcon>
        </Box>
    );
}