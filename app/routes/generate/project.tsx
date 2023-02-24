import { Container, Space, Stepper } from '@mantine/core';
import { type Project } from '@prisma/client';
import { json, type LoaderArgs } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import LoginButtons from 'app/components/auth/LoginButtons';
import { DataContext } from 'app/data/DataContext';
import useBreakpoints from 'app/hooks/useBreakpoint';
import Layout from 'app/layouts/Layout';
import auth from 'app/services/auth.server';
import { useState, useContext } from 'react';
import { prismaClient } from '../../lib/Prisma';
import { useColors } from '../../hooks/useColors';

export async function loader({ request, params }: LoaderArgs) {
    const user = await auth(request);
    let projects: Project[] = [];
    if (user)
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
    return json({
        projects: projects,
    });
}

export default function ProjectLayout() {
    const { user } = useContext(DataContext);
    const { projects } = useLoaderData();
    console.log({ projects, user });
    const { smallerSm, isXl } = useBreakpoints();
    let active: number = 0;
    if (!user) {
        active = 0;
    } else {
        // active = projects.Topics.length ? 4 : 3;
        // active = projects.Sections.length ? 3 : 2;
        active = projects.length ? 2 : 1;
    }

    const [activeStep, setActiveStep] = useState(active);
    const { primaryBackgroundColor } = useColors();
    const aside = (
        <Stepper
            mt={'lg'}
            size={smallerSm ? 'xs' : isXl ? 'md' : 'sm'}
            active={activeStep}
            orientation="vertical"
            allowNextStepsSelect={false}
            color={primaryBackgroundColor}
        >
            <Stepper.Step label="Вход" description="Авторизуйтесь">
                <LoginButtons />
            </Stepper.Step>
            <Stepper.Step label="Проект" description="Назовите проект">
                Step 2 content: Verify email
            </Stepper.Step>
            <Stepper.Step label="Разделы" description="Сгенерируйте разделы">
                Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Step label="Статьи" description="Сгенерируйте статьи">
                Step 4 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>Completed, click back button to get to previous step</Stepper.Completed>
        </Stepper>
    );

    return (
        <Layout aside={[aside]}>
            <Outlet context={{ user, setActiveStep }} />
        </Layout>
    );
}
