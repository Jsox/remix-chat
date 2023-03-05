import { type LoaderArgs, json, redirect, type MetaFunction } from '@remix-run/node';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { IconListDetails, type TablerIcon } from '@tabler/icons';
import { HeroText } from 'app/components/HeroText/HeroText';
import { useEffect } from 'react';
import { type User, type Project } from '@prisma/client';
import { prismaClient } from 'app/lib/Prisma';
import auth from 'app/services/auth.server';
import {Text} from '@mantine/core'
import { useTime } from 'app/hooks/useTime';
import { useColors } from 'app/hooks/useColors';

export const meta: MetaFunction = () => {
    // const { currentProject } = useLoaderData();
  return {
    title: "",
    description: ""
  };
};
export async function loader({ request, params }: LoaderArgs) {
    const { projectSlug } = params;
    const user: User | null = await auth(request);
    if (!user || !projectSlug) {
        throw redirect('/', 404);
    }

    const currentProject = await prismaClient.project.findFirst({
        where: {
            User: {
                id: user.id,
            },
            url: projectSlug,
        },
    });
    
    
    if (!currentProject) {
        throw redirect('/', 404);
    }

    return json({ projectSlug, currentProject });
}

type ISetNavBarOptions = Record<string, TablerIcon | string | { label: string; link: string }[] | boolean>[];

interface IProject {
    projects: Project[] | [];
    setNavBarLinksAddon: (el: ISetNavBarOptions) => void;
}
export default function ProjectPage() {
    const loader = useLoaderData();
    const currentProject: Project = loader.currentProject
    const { projects, setNavBarLinksAddon }: IProject = useOutletContext();
    let temp: ISetNavBarOptions = [];
    if (projects?.length) {
        const links = projects.map((project) => {
            return {
                label: project.title,
                link: '/generate/project/' + project.url,
            };
        });
        temp.push({
            label: 'Ваши проекты',
            icon: IconListDetails,
            links,
            initiallyOpened: true,
        });
    }
    useEffect(() => {
        setNavBarLinksAddon(temp);
    });
    // const { projectSlug, currentProject } = useLoaderData();
    // const currentProject = projects.filter(project => projectSlug === project.url);
    // console.log({ currentProject });
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
