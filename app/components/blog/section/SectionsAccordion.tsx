import { Accordion, createStyles, Flex } from '@mantine/core';
import { useListState, useInputState, useDebouncedValue } from '@mantine/hooks';
import type { Project, Section } from "@prisma/client";
import PageTitle from "app/components/PageTitle";
import { StepperDesc } from "app/routes/generate.project";
import { useEffect, useState } from "react";
import { useHydrated } from "remix-utils";
import InfoMessage from "../../InfoMessage";
import InactiveSectionBox from './InactiveSectionBox';
import ItemAccordion from "./ItemAccordion";
import SectionsSearch from './SectionsSearch';

const useStyles = createStyles((theme) => ({
    chevron: {
        '&[data-rotate]': {
            transform: 'rotate(-90deg)',
        },
    },
}));

export default function SectionsAccordion({ sections, project }: { sections: Section[], project: Project }) {
    const { classes } = useStyles();
    const hydrated = useHydrated()

    sections.sort((a, b) => Date.parse(b.created) - Date.parse(a.created))

    const as = () => sections.filter(item => item.active === true)
    // const [activeSections, activeSectionsHandlers] = useListState<Section>(as)

    const ts = () => sections.filter(item => item.active === false)

    const [trashSections, trashSectionsHandlers] = useListState<Section>(ts())

    const [filteredSections, filteredSectionsHandlers] = useListState<Section>(as())

    const [searchStr, changeSearchStr] = useInputState('')
    const [debouncedSearchStr] = useDebouncedValue(searchStr, 600);

    useEffect(() => {
        trashSectionsHandlers.setState(ts())
        filteredSectionsHandlers.setState(as())
    }, [project])

    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        if (searchStr.length < 3) {
            trashSectionsHandlers.setState(ts())
            filteredSectionsHandlers.setState(as())
            return;
        }
        let search = searchStr.toLowerCase()
        trashSectionsHandlers.setState(ts())
        filteredSectionsHandlers.setState(as())
        filteredSectionsHandlers.filter(s => {
            return JSON.stringify(s)
                .toString()
                .toLowerCase()
                .includes(search);
        })
        trashSectionsHandlers.filter(s => {
            return JSON.stringify(s)
                .toString()
                .toLowerCase()
                .includes(search);
        })
    }, [debouncedSearchStr])
    // useEffect(() => {
    //     console.log(searchStr);
    // }, [searchStr])

    return (
        <>
            <PageTitle title={`Разделы Блога`} />

            {/* {!hydrated && <Text>Загрузка...</Text>} */}

            {<StepperDesc px={'lg'} pb={{ xs: 'lg', md: 'xl' }} title={'Редактирование раздела'} desc={'Сгенерируйте недостающие тексты для раздела, если это необходимо! Отредактируйте заголовок и поля раздела, по ним будут генерироваться статьи блога! Если раздел не подходит или не нужен - переместите его в корзину.'} />}

            {!!sections.length && <SectionsSearch value={searchStr} onChange={changeSearchStr} placeholder='Поиск по всем текстам разделов' />}

            {filteredSections.length !== 0
                ? <>

                    <Accordion value={activeSection} onChange={setActiveSection} multiple={false} className={classes.root} classNames={classes} variant={'separated'} chevronPosition="left" mx="auto">

                        {
                            filteredSections.map((section, i) => (

                                <ItemAccordion markedText={debouncedSearchStr} key={section.id} project={project} section={section} />

                            ))
                        }

                    </Accordion>
                </>
                : <>
                    {hydrated && debouncedSearchStr.length === 0 && <InfoMessage color={'red'} title="Пока нет разделов" text={'У Вас пока нет сгенерированных разделов для для этого Блога. Сгенерируйте нажав на кнопку'} />}
                    {debouncedSearchStr.length > 0 && <InfoMessage title="Ничего не нашлось" text={'Нет такого текста в Разделах блога'} />}
                </>
            }

            <PageTitle title={'Разделы Блога в корзине'} />
            <Flex align={'center'} direction={'column'}>
                {trashSections.length
                    ? trashSections.map((section) => (
                        <InactiveSectionBox markedText={debouncedSearchStr} key={section.id} section={section} />
                    ))

                    : <>
                        {hydrated && debouncedSearchStr.length === 0 && <InfoMessage color={'red'} title="Пока нет разделов в корзине" text={'У Вас пока нет разделов Блога перемещенных в корзину'} />}
                        {debouncedSearchStr.length > 0 && <InfoMessage title="Ничего не нашлось" text={'Нет такого текста в Корзине'} />}
                    </>
                }
            </Flex>
        </>
    )
}

