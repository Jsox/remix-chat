import {
    type LoaderArgs,
    json,
    type MetaFunction,
    type ActionArgs,
} from '@remix-run/node';
import { useFetcher, useLoaderData, useOutletContext } from '@remix-run/react';
import { HeroText } from 'app/components/HeroText/HeroText';
import { useEffect } from 'react';
import { type User, type Project, Section } from '@prisma/client';
import { prismaClient } from 'app/lib/Prisma';
import auth from 'app/services/auth.server';
import { Button, Container, Text } from '@mantine/core';
import { useTime } from 'app/hooks/useTime';
import { useColors } from 'app/hooks/useColors';
import SectionsAccordion from 'app/components/blog/section/SectionsAccordion';
import { showNotification } from '@mantine/notifications';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import EventStreamer from 'app/components/EventStreamer';
import { emitter } from 'app/services/emitter';
import { urlSearch } from 'app/lib/urlSearch.server';
import BigButton from 'app/components/BigButton';

export const meta: MetaFunction = ({ data }) => {
    const { currentProject } = data;
    return {
        title: currentProject?.title,
        description: 'Страница проекта Блога',
    };
};

export async function action({ request, context }: ActionArgs) {
    const formData = await request.formData();
    const message = formData.get('message');
    const uniqueUserString = formData.get('uniqueUserString');

    emitter.emit(uniqueUserString, message);
    return json({ message });
}

export async function loader({ request, params, context }: LoaderArgs) {
    const { projectSlug } = params;
    const user: User | null = await auth(request);
    if (!user || !projectSlug) {
        throw json(null, 404);
    }

    const [page, section, search] = urlSearch(request, [
        'page',
        'section',
        'search',
    ]);

    const onPage = 5;
    const p = page ? parseInt(page) : 1;
    const skip = (p - 1) * onPage;

    const textSearch = search
        ? {
              OR: [
                  {
                      sectionTitle: {
                          contains: search,
                      },
                  },
                  {
                      sectionMetaTitle: {
                          contains: search,
                      },
                  },
                  {
                      sectionHtmlDescription: {
                          contains: search,
                      },
                  },
                  {
                      sectionMetaDescription: {
                          contains: search,
                      },
                  },
                  {
                      sectionKeyWords: {
                          contains: search,
                      },
                  },
              ],
          }
        : {};

    const where = {
        active: true,
        ...textSearch,
    };

    const currentProject = await prismaClient.project.findFirst({
        where: {
            User: {
                id: user.id,
            },
            url: projectSlug,
        },
        include: {
            _count: {
                select: {
                    Sections: {
                        where,
                    },
                },
            },
            Sections: {
                take: onPage,
                skip,
                orderBy: {
                    created: 'desc',
                },
                where,
                include: {
                    Topics: true
                }
            },
        },
    });
    if (!currentProject) {
        throw json(null, 404);
    }
    const sectionsTrash = await prismaClient.section.findMany({
        where: {
            ...where,
            active: false,
            projectId: currentProject.id
        },
    });
    console.log("🚀 ~ file: generate.project.$projectSlug._index.tsx:142 ~ loader ~ sectionsTrash:", sectionsTrash)

    return json({ projectSlug, currentProject, user, sectionsTrash });
}

export default function ProjectPage() {
    const { user, currentProject, sectionsTrash } = useLoaderData<{
        user: User;
        currentProject: Project;
        sectionsTrash: Section[]
    }>();

    const {
        setBreadCrumbs,
        uniqueUserString,
        setUserTokens,
    }: any = useOutletContext();

    const { fromNow, formatString } = useTime(currentProject.created);
    const { contrastColor } = useColors();
    const desc = (
        <>
            <Text>
                На этой странице Вы можете сгенерировать разделы блога с их
                обычными и мета-описаниями, а так же с ключевыми словами
            </Text>
            <Text size={'md'} mt={'md'} color={contrastColor}>
                Создан {fromNow} ({formatString})
            </Text>
        </>
    );
    const bci = [
        {
            title: 'Главная',
            url: '/',
        },
        {
            title: 'Сгенерировать контент',
            url: '/generate',
        },
        {
            title: 'Проект Блога',
            url: '/generate/project',
        },
        {
            title: currentProject.title,
            url: '/generate/project/' + currentProject.url,
        },
    ];

    useEffect(() => {
        setBreadCrumbs(bci);
    }, [currentProject]);

    const genSecFetcher = useFetcher();

    const genSec = () => {
        if (!user) return;
        genSecFetcher.submit(
            {
                query: currentProject.title,
                pid: `${currentProject.id}`,
                uniqueUserString,
            },
            {
                action: '/api/createSections',
                method: 'post',
            }
        );
    };

    useEffect(() => {
        if (
            genSecFetcher.data &&
            genSecFetcher.data.result.decremented &&
            !genSecFetcher.data?.error
        ) {
            showNotification({
                id: 'genSecFetcher',
                title: 'Отлично!',
                message: `Новые Разделы блога добавлены!`,
                color: 'green',
                icon: <IconCheck />,
            });

            setUserTokens((exist) => {
                return exist - genSecFetcher.data.result.decremented;
            });
        }
        if (genSecFetcher.data && genSecFetcher.data?.error) {
            showNotification({
                id: 'genSecFetcherError',
                title: 'Ошибка!',
                message: genSecFetcher.data?.error,
                color: 'red',
                icon: <IconAlertCircle />,
            });
        }
    }, [genSecFetcher.data]);

    const isFetching = genSecFetcher.state !== 'idle';

    return (
        <>
            <HeroText
                titleStart={
                    <Text tt={'capitalize'} size={24}>
                        Проект Блога:
                    </Text>
                }
                titleHighlighted={currentProject.title}
                titleEnd=""
                description={desc}
            />
            <Container p={0}>
                <BigButton
                    disabled={isFetching}
                    loading={isFetching}
                    onClick={genSec}
                >
                    Сгенерировать разделы Блога
                </BigButton>
                {/* <Form method="post" >
                    <input type="hidden" value={uniqueUserString} name={'uniqueUserString'} />
                    <Textarea minRows={5} m={'xl'} name="message" />
                    <Button type={'submit'}>Send</Button>
                </Form> */}

                <EventStreamer />
                <SectionsAccordion
                    project={currentProject}
                    sectionsTrash={sectionsTrash}
                />
            </Container>
        </>
    );
}
