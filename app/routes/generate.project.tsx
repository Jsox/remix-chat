import { Stepper, Title, Text } from '@mantine/core';
import { json, redirect, type LoaderArgs } from '@remix-run/node';
import { Outlet, useLoaderData, useOutletContext } from '@remix-run/react';
import LoginButtons from 'app/components/auth/LoginButtons';
import useBreakpoints from 'app/hooks/useBreakpoint';
import Layout from 'app/layouts/Layout';
import auth from 'app/services/auth.server';
import { useEffect } from 'react';
import { prismaClient } from 'app/lib/Prisma';
import type { Project, Section, Topic } from '@prisma/client';
import { IconBulb } from '@tabler/icons';

// export async function action({ request }) {
//     const user = await auth(request);
//     if (!user) return redirect('/generate/project', 401);
// }
export async function loader({ request, params }: LoaderArgs) {
    console.log({ params });
    const { projectSlug, sectionSlug } = params;

    const user = await auth(request);
    if (!user && projectSlug) throw redirect('/generate/project', 301);

    let projects: Project[] = [];
    let sections: Section[] = [];
    let topics: Topic[] = [];
    if (user && user.id) {
        projects = await prismaClient.project.findMany({
            where: {
                User: {
                    id: user.id,
                },
            },
            include: {
                Sections: true,
                Topics: true,
            },
        });
        sections = await prismaClient.section.findMany({
            where: {
                User: {
                    id: user.id,
                },
            },
            include: {
                Topics: true,
            },
        });
        topics = await prismaClient.topic.findMany({
            where: {
                User: {
                    id: user.id,
                },
            },
        });
    }

    return json({
        projects,
        sections,
        topics,
        projectSlug,
        sectionSlug,
    });
}

export default function ProjectLayout() {
    const context: Record<string, any> = useOutletContext();
    const { user, setAside } = context;
    const { projects, sections, topics, projectSlug, sectionSlug } = useLoaderData();
    // console.log({ projects, user });
    const { smallerSm, isXl } = useBreakpoints();
    let active: number = 0;
    if (!user) {
        active = 0;
    } else {
        active = topics.length ? 4 : 3;
        active = sections.length ? 3 : 2;
        active = projects.length ? 2 : 1;
    }
    const aside = (
        <Stepper
            mt={'lg'}
            size={smallerSm ? 'xs' : isXl ? 'md' : 'sm'}
            active={active}
            orientation="vertical"
            allowNextStepsSelect={false}
            // color={'red'}
        >
            <Stepper.Step label="Вход" description="Авторизуйтесь">
                <LoginButtons />
            </Stepper.Step>
            <Stepper.Step label="Проект" description="Назовите проект">
                <StepperDesc
                    title="Название проекта блога"
                    desc="Выберите краткое но ёмкое название для проекта блога, оно будет взято за основу, при генерации
                    разделов сайта."
                />
            </Stepper.Step>
            <Stepper.Step label="Разделы" description="Сгенерируйте разделы">
                <StepperDesc
                    title="Создание разделов блога"
                    desc="Используйте технологию ИИ для генерации структурированных и увлекательных разделов блога. На их основе будут сгенерированы статьи."
                />
            </Stepper.Step>
            <Stepper.Step label="Статьи" description="Сгенерируйте статьи">
                <StepperDesc
                    title="Генерация статей блога"
                    desc="Используйте ИИ-помощника Аишу для создания актуальных и интересных статей для блога на основе разделов вашего блога. Сгенерируйте высококачественный контент, который найдет отклик у вашей аудитории."
                />
            </Stepper.Step>
            <Stepper.Completed>
                <StepperDesc
                    title="Ура!"
                    desc="Вы уже совсем освоились и сгенерировали блог с разделами и статьями. Поздравляем!"
                />
            </Stepper.Completed>
        </Stepper>
    );
    useEffect(() => {
        setAside([aside]);
    });

    return (
        <Layout>
            <Outlet context={{ ...context, projects, sections, topics, projectSlug, sectionSlug }} />
        </Layout>
    );
}

export const StepperDesc = ({ title, desc }: Record<string, string>) => (
    <>
        <Title align="center" m={0} py={'md'} order={4}>
            <IconBulb color={'yellow'} /> {title}
        </Title>
        <Text align="justify">{desc}</Text>
    </>
);
