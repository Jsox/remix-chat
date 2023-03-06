import { type LoaderArgs, json, redirect, type MetaFunction } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { IconDetails, IconListDetails, type TablerIcon, IconStack2 } from '@tabler/icons';
import { HeroText } from 'app/components/HeroText/HeroText';
import { useEffect } from 'react';
import { type User, type Project } from '@prisma/client';
import { prismaClient } from 'app/lib/Prisma';
import auth from 'app/services/auth.server';
import { Text } from '@mantine/core'
import { useTime } from 'app/hooks/useTime';
import { useColors } from 'app/hooks/useColors';
import { TSetNavBarOptions } from 'app/types';
import { useHydrated } from 'remix-utils';

export const meta: MetaFunction = ({ data }) => {
    const { currentProject } = data;
    return {
        title: currentProject?.title,
        description: "Страница проекта Блога"
    };
};
export async function loader({ request, params }: LoaderArgs) {
    const { projectSlug } = params;
    const user: User | null = await auth(request);
    if (!user || !projectSlug) {
        throw json(null, 404);
    }

    const currentProject = await prismaClient.project.findFirst({
        where: {
            User: {
                id: user.id,
            },
            url: projectSlug,
        },
        include: {
            Sections: true,
            Topics: true,
        }
    });


    if (!currentProject) {
        throw json(null, 404);
    }

    return json({ projectSlug, currentProject });
}

export default function ProjectPage() {
    const loader = useLoaderData();
    const currentProject: Project = loader.currentProject
    const { navBarLinksAddon, setNavBarLinksAddon, setBreadCrumbs }: any = useOutletContext()

    // navBarLinksAddon.push({
    //     label: 'Разделы Проекта',
    //     icon: IconStack2,
    //     initiallyOpened: true,
    //     links: [{
    //         link: '/',
    //         label: 'test'
    //     }]

    // })

    // useEffect(() => {
    //     setNavBarLinksAddon(navBarLinksAddon)
    // }, [])

    const { fromNow, formatString } = useTime(currentProject.created);
    const { contrastColor } = useColors();
    const desc = (
        <>
            <Text>
                На этой странице Вы можете сгенерировать разделы блога с их обычными и мета-описаниями, а так же с
                ключевыми словами
            </Text>
            <Text size={'md'} mt={'md'} color={contrastColor}>
                Создан {fromNow} ({formatString})
            </Text>
        </>
    );
    const bci = [
        {
            title: 'Главная',
            url: '/'
        }, {
            title: 'Сгенерировать контент',
            url: '/generate'
        }, {
            title: 'Проект Блога',
            url: '/generate/project'
        }, {
            title: currentProject.title,
            url: '/generate/project/' + currentProject.url
        }
    ]

    useEffect(() => {
        setBreadCrumbs(bci)
    }, []);

    return (
        <>
            <HeroText
                titleStart={<Text tt={'capitalize'} size={24}>Проект Блога:</Text>}
                titleHighlighted={currentProject.title}
                titleEnd=""
                description={desc}
            />
        </>
    );
}
