import { Transition, Accordion, Title, Flex, createStyles, rem, ActionIcon, Box, Tooltip, Text, type AccordionControlProps, Highlight } from '@mantine/core';
import type { Project, Section } from '@prisma/client';
import { NavLink, useFetcher } from '@remix-run/react';
import { IconWriting, IconListDetails, IconTrash } from "@tabler/icons";
import ButtonCustom from "app/components/ButtonCustom";
import useHashObject from 'app/hooks/useHashObject';
import { getTimeFromNow } from 'app/hooks/useTime';
import { useState, useEffect } from "react";
import SectionEditForm from "./SectionEditForm";

const useStyles = createStyles((theme) => ({

    item: {
        border: `${rem(1)} solid ${theme.colorScheme === 'dark'
            ? theme.colors.darkBlue[9]
            : theme.colors.gray[2]
            }`,
        position: 'relative',
        paddingTop: 10,
        zIndex: 0,
        transition: 'all 0.15s ease',
        boxShadow: theme.shadows.xs,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[6]
                : theme.colors.gray[0],

        '&:hover': {
            boxShadow: theme.shadows.sm,
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.darkBlue[8]
                    : theme.colors.gray[1],
            transform: 'scale(1.01)',
        },

        '&[data-active]': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[5]
                    : theme.colors.gray[2],
            border: `${rem(1)} solid ${theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[2]
                }`,
            transform: 'scale(1.02)',
            boxShadow: theme.shadows.md,
            borderRadius: theme.radius.lg,
            zIndex: 1,
        },
    },

}));
export default function ItemAccordion({ section, project, markedText }: { section: Section, project: Project, markedText?: string }) {
    const { classes } = useStyles();
    // const [mounted, setMounted] = useState(false)

    // const changeMounted = () => {
    //     setMounted(false)
    //     setTimeout(() => {
    //         setMounted(true)
    //     }, 1);
    // }

    // useEffect(() => {
    //     changeMounted()
    // }, [])


    const editSectionFetcher = useFetcher()

    useEffect(() => {
        // console.log({ editSectionFetcher });
    }, [editSectionFetcher])

    const onSubmit = (data, options) => {
        // console.log(editSectionFetcher);

        // editSectionFetcher.submit(data, options)
    }


    return (
        // <Transition key={section.id} mounted={mounted} transition={'scale-y'} duration={200} timingFunction="ease">
        //     {(styles) => (
        <Accordion.Item
            // style={{ ...styles }}
            className={classes.item}
            // onClick={() => setHashParams({ section: section.id })}
            value={`${section.id}`}
            key={section.id}
            id={`${section.id}`}
            px={{ xs: 'xs', md: 'md', lg: 'lg' }}
        >
            <AccordionControl sid={section.id} maw={'calc(100% - 40px)'}>
                <>
                    <Title mb={'sm'} order={4}>
                        <Highlight highlight={markedText || ''}>
                            {section.sectionTitle}
                        </Highlight>
                    </Title>
                    <Text lineClamp={2} c={'dimmed'}>
                        <Highlight highlight={markedText || ''}>
                            {section.sectionMetaDescription}
                        </Highlight>
                    </Text>
                    <Text pt={'md'} align={'end'}>{getTimeFromNow(section.created)}</Text>
                </>
            </AccordionControl>
            <Accordion.Panel>
                <editSectionFetcher.Form action={`/api/update/section/${section.id}`} method={'post'}>
                    <Flex
                        gap="lg"
                        justify={'space-between'}
                        align="center"
                        wrap="wrap"
                    >
                        <ButtonCustom
                            onClick={onSubmit}
                            Icon={IconWriting}
                            avatarColor={'grape'}
                            title={'Сгенерировать'}
                            desc={'недостающие тексты раздела'}
                        />
                        <ButtonCustom
                            component={NavLink}
                            to={`/generate/project/${project.url}/${section.id}`}
                            Icon={IconListDetails}
                            avatarColor={'orange'}
                            title={'Сгенерировать'}
                            desc={'статьи по этому разделу'}
                        />
                    </Flex>


                    <SectionEditForm section={section} />

                </editSectionFetcher.Form>
            </Accordion.Panel>
        </Accordion.Item>
        //     )}
        // </Transition>
    )
}

function AccordionControl(props: AccordionControlProps) {
    const { sid } = props
    const sectionToTrashFetcher = useFetcher()

    useEffect(() => {
        if (sectionToTrashFetcher.type === "done") {
            console.log(sectionToTrashFetcher.data)
        }
    }, [sectionToTrashFetcher]);

    const sectionToTrash = (e) => {
        e.preventDefault()
        e.stopPropagation()
        sectionToTrashFetcher.submit({
            action: 'setActiveFalse'
        }, {
            action: `/api/update/section/${sid}`,
            method: 'post'
        })
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control {...props} />
            <Tooltip
                color={'blue'}
                position="top"
                withArrow
                label={'Переместить раздел в корзину'}
                style={{ zIndex: 9999 }}
            >
                <ActionIcon onClick={sectionToTrash} color={'red.9'} variant={'filled'} style={{ transition: 'all .3 ease' }} size="lg">
                    <IconTrash size="1rem" />
                </ActionIcon>
            </Tooltip>
        </Box>
    );
}