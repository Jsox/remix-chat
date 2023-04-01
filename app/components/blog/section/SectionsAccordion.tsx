import {
    Accordion,
    Box,
    createStyles,
    Flex,
    Pagination,
    Spoiler,
    Transition,
} from '@mantine/core';
import {
    useListState,
    useInputState,
    useDebouncedValue,
    usePagination,
    useScrollIntoView,
    useDidUpdate,
} from '@mantine/hooks';
import type { Project, Section } from '@prisma/client';
import PageTitle from 'app/components/PageTitle';
import { StepperDesc } from 'app/routes/generate.project';
import { useEffect, useState } from 'react';
import { useHydrated } from 'remix-utils';
import InfoMessage from '../../InfoMessage';
import InactiveSectionBox from './InactiveSectionBox';
import ItemAccordion from './ItemAccordion';
import SectionsSearch from './SectionsSearch';
import { useSearchParams } from '@remix-run/react';

const useStyles = createStyles((theme) => ({
    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));

export default function SectionsAccordion({
    project,
    sectionsTrash,
}: {
    project: Project;
    sectionsTrash: Section[];
}) {
    let sections: Section[] = project.Sections;

    const { classes } = useStyles();
    const hydrated = useHydrated();

    const [urlSearchParams, setSearchParams] = useSearchParams();
    const p = urlSearchParams.get('page');
    let pageInit = p ? parseInt(p) : 1;
    const [page, onPageChange] = useState(pageInit);

    const search = urlSearchParams.get('search') || '';

    const [searchStr, changeSearchStr] = useInputState(search);
    const [debouncedSearchStr] = useDebouncedValue(searchStr, 600);

    useEffect(() => {
        changeSearchStr(search);
    }, [search, changeSearchStr]);

    if (search.length > 2) {
        pageInit = 1;
    }

    const onPage = 5;
    const totalPages = Math.ceil(project._count.Sections / onPage);
    const needsPagination = totalPages > 1;

    const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
        offset: 70,
    });
    useDidUpdate(() => {
        setSearchParams(
            (prev) => {
                page > 1 ? prev.set('page', `${page}`) : prev.delete('page');
                return prev;
            },
            {
                preventScrollReset: true,
            }
        );

        setTimeout(() => {
            scrollIntoView({
                alignment: 'start',
            });
        }, 200);
    }, [page]);

    useDidUpdate(() => {
        onPageChange(pageInit);
    }, [pageInit]);

    const [activeSection, setActiveSection] = useState<string | null>(null);

    useDidUpdate(() => {
        setSearchParams(
            (prev) => {
                searchStr.length < 3
                    ? prev.delete('search')
                    : prev.set('search', `${searchStr}`);
                return prev;
            },
            {
                preventScrollReset: true,
            }
        );
    }, [debouncedSearchStr]);

    return (
        <>
            <PageTitle title={`Разделы Блога`} />

            {/* {!hydrated && <Text>Загрузка...</Text>} */}

            {page < 2 && (
                <StepperDesc
                    px={'lg'}
                    pb={{ xs: 'lg', md: 'xl' }}
                    title={'Редактирование раздела'}
                    desc={
                        'Сгенерируйте недостающие тексты для раздела, если это необходимо! Отредактируйте заголовок и поля раздела, по ним будут генерироваться статьи блога! Если раздел не подходит или не нужен - переместите его в корзину.'
                    }
                />
            )}
            <span ref={targetRef}></span>
            {(!!sections.length || !!searchStr.length) && (
                <SectionsSearch
                    value={searchStr}
                    onChange={changeSearchStr}
                    placeholder="Поиск по всем текстам разделов"
                />
            )}

            {sections.length !== 0 ? (
                <Accordion
                    // style={{
                    //     filter: sectionsUpdated ? 'opacity(.5)' : 'none',
                    //     transition: 'all 1s ease-out',
                    // }}
                    value={activeSection}
                    onChange={setActiveSection}
                    multiple={false}
                    className={classes.root}
                    classNames={classes}
                    variant={'separated'}
                    chevronPosition="left"
                    mx="auto"
                >
                    {sections.map((section, i) => (
                        <ItemAccordion
                            activeSection={parseInt((activeSection || '0'))}
                            markedText={debouncedSearchStr}
                            key={section.id}
                            project={project}
                            section={section}
                        />
                    ))}
                </Accordion>
            ) : (
                <>
                    {hydrated && debouncedSearchStr.length === 0 && (
                        <InfoMessage
                            color={'red'}
                            title="Пока нет разделов"
                            text={
                                'У Вас пока нет сгенерированных разделов для для этого Блога. Сгенерируйте нажав на кнопку'
                            }
                        />
                    )}
                    {debouncedSearchStr.length > 0 && (
                        <InfoMessage
                            title="Ничего не нашлось"
                            text={'Нет такого текста в Разделах блога'}
                        />
                    )}
                </>
            )}

            {needsPagination && (
                <Box>
                    <Pagination
                        position={'center'}
                        m={'lg'}
                        total={totalPages}
                        value={page}
                        onChange={onPageChange}
                    />
                </Box>
            )}

            <PageTitle title={'Разделы Блога в корзине'} />
            <Spoiler
                maxHeight={320}
                showLabel="Показать все"
                hideLabel="Скрыть"
            >
                <Flex align={'center'} direction={'column'}>
                    {sectionsTrash.length ? (
                        sectionsTrash.map((section) => (
                            <InactiveSectionBox
                                markedText={debouncedSearchStr}
                                key={section.id}
                                section={section}
                            />
                        ))
                    ) : (
                        <>
                            {hydrated && debouncedSearchStr.length === 0 && (
                                <InfoMessage
                                    color={'red'}
                                    title="Пока нет разделов в корзине"
                                    text={
                                        'У Вас пока нет разделов Блога перемещенных в корзину'
                                    }
                                />
                            )}
                            {debouncedSearchStr.length > 0 && (
                                <InfoMessage
                                    title="Ничего не нашлось"
                                    text={'Нет такого текста в Корзине'}
                                />
                            )}
                        </>
                    )}
                </Flex>
            </Spoiler>
        </>
    );
}
