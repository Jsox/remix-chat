import {
    Accordion,
    Title,
    Flex,
    createStyles,
    rem,
    ActionIcon,
    Box,
    Tooltip,
    Text,
    type AccordionControlProps,
    Highlight,
    Button,
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import type { Project, Section } from '@prisma/client';
import { NavLink, useFetcher, useOutletContext } from '@remix-run/react';
import {
    IconWriting,
    IconListDetails,
    IconTrash,
    IconAlertCircle,
} from '@tabler/icons';
import ButtonCustom from 'app/components/ButtonCustom';
import { getTimeFromNow } from 'app/hooks/useTime';
import { useEffect, useState } from 'react';
import { useHydrated } from 'remix-utils';
import SectionEditForm from './SectionEditForm';
import { useEffect } from 'react';

const useStyles = createStyles((theme) => ({
    item: {
        border: `${rem(1)} solid ${
            theme.colorScheme === 'dark'
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
            border: `${rem(1)} solid ${
                theme.colorScheme === 'dark'
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
export default function ItemAccordion({
    section,
    project,
    markedText,
    activeSection,
}: {
    section: Section;
    project: Project;
    markedText?: string;
    activeSection: number;
}) {

    const { classes } = useStyles();

    const { uniqueUserString } = useOutletContext();

    const sectionExtendFetcher = useFetcher();
    const isIdle = sectionExtendFetcher.state === 'idle';
    const onSubmitSectionExtend = (data: any, options: any) => {
        sectionExtendFetcher.submit(
            {
                sid: section.id.toString(),
                uniqueUserString,
            },
            {
                action: '/api/createSectionExtend',
                method: 'post',
            }
        );
    };

    useEffect(() => {
        if (sectionExtendFetcher.data) {
            if (sectionExtendFetcher.data?.error) {
                showNotification({
                    id: 'sectionExtendFetcher',
                    title: 'Ошибка!',
                    message: sectionExtendFetcher.data.error,
                    color: 'red',
                    icon: <IconAlertCircle />,
                });
            }
            if (!sectionExtendFetcher.data?.error) {
                // console.log(
                //     '🚀 ~ file: ItemAccordion.tsx:89 ~ sectionExtendFetcher.data:',
                //     { section }
                // );
            }
        }
    }, [sectionExtendFetcher]);

    const hydrated = useHydrated();

    return (
        <Accordion.Item
            className={classes.item}
            value={`${section.id}`}
            key={section.id}
            id={`${section.id}`}
            px={{ xs: 'xs', md: 'md', lg: 'lg' }}
        >
            <AccordionControl
                project={project}
                section={section}
                sid={section.id}
                maw={'calc(100% - 40px)'}
            >
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
                    <Text pt={'md'} align={'end'}>
                        {hydrated ? getTimeFromNow(section.created) : ''}
                    </Text>
                </>
            </AccordionControl>
            <Accordion.Panel>
                <Flex
                    gap="lg"
                    justify={'space-between'}
                    align="center"
                    wrap="wrap"
                >
                    <ButtonCustom
                        disabled={!isIdle}
                        onClick={onSubmitSectionExtend}
                        Icon={IconWriting}
                        avatarColor={'grape'}
                        title={'Сгенерировать'}
                        desc={'недостающие тексты раздела'}
                    />
                    <ButtonCustom
                        component={NavLink}
                        to={`/generate/project/${project.url}/${section.slug}`}
                        Icon={IconListDetails}
                        avatarColor={'orange'}
                        title={'Сгенерировать'}
                        desc={'статьи по этому разделу'}
                    />
                </Flex>

                {activeSection === section.id && <SectionEditForm section={section} />}
            </Accordion.Panel>
        </Accordion.Item>
    );
}
interface IAccordionControlProps extends AccordionControlProps {
    section: Section;
    project: Project;
    sid: number;
}
function AccordionControl(props: IAccordionControlProps) {
    const { sid, project, section } = props;
    const sectionToTrashFetcher = useFetcher();

    const trashing = sectionToTrashFetcher.state !== 'idle';

    const sectionToTrash = () => {
        sectionToTrashFetcher.submit(
            {
                action: 'setActive',
                value: 'false',
            },
            {
                action: `/api/update/section/${sid}`,
                method: 'post',
            }
        );
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Accordion.Control {...props} />
            <Button.Group
                mih={rem(100)}
                style={{ justifyContent: 'space-between' }}
                orientation="vertical"
            >
                <Tooltip
                    color={'blue'}
                    position="top"
                    withArrow
                    label={'Переместить раздел в корзину'}
                    style={{ zIndex: 9999 }}
                >
                    <ActionIcon
                        loading={trashing}
                        disabled={trashing}
                        onClick={sectionToTrash}
                        color={'pink.9'}
                        variant={'filled'}
                        style={{ transition: 'all .3 ease' }}
                        size="lg"
                    >
                        <IconTrash size="1rem" />
                    </ActionIcon>
                </Tooltip>
                <Tooltip
                    color={'blue'}
                    position="top"
                    withArrow
                    label={'Перейти к статьям по этому разделу'}
                    style={{ zIndex: 9999 }}
                >
                    <ActionIcon
                        component={NavLink}
                        to={`/generate/project/${project.url}/${section.slug}`}
                        color={'blue'}
                        variant={'filled'}
                        style={{ transition: 'all .3 ease' }}
                        size="lg"
                    >
                        <IconListDetails size="1rem" />
                    </ActionIcon>
                </Tooltip>
            </Button.Group>
        </Box>
    );
}
