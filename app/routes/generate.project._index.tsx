import { useEffect } from 'react';
import { Form, useFetcher, useOutletContext } from '@remix-run/react';
import { Alert, Flex, Title } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';
import { type MetaFunction } from '@remix-run/node';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import Article from 'app/components/Article';
import CreateProjectForm from 'app/components/blog/CreateProjectForm';
import { HeroText } from 'app/components/HeroText/HeroText';
import WaitingMessages from 'app/components/WaitingMessages';
import { CreateProjectIndexArticle } from 'app/data/articles';
import { ProjectCard } from 'app/components/ProjectCard/ProjectCard';
import { Project } from '@prisma/client';
import PageTitle from 'app/components/PageTitle';

export const meta: MetaFunction = () => ({
    title: 'Сгенерировать блог с помощью ИИ в несколько кликов',
    description:
        'Сгенерировать высококачественный блог всего за несколько кликов. С помощью ИИ можно сгенерировать разделы и посты блога по указанной теме',
    keywords: 'назвать проект блога, выбрать название блога, привлечь читателей, создать бренд, сгенерировать блог',
});

export default function GenerateProject() {
    const { setNavBarLinksAddon, projects }: any = useOutletContext();
    const [newProject, createNewProject] = useInputState('');
    const newProjectFetcher = useFetcher();

    useEffect(() => {
        setNavBarLinksAddon([]);
    });

    const isIdle = newProjectFetcher.state === 'idle';

    const submitNewProject = () => {
        newProjectFetcher.submit(
            {
                projectName: newProject,
            },
            {
                method: 'post',
                action: '/api/createProject',
            }
        );
    };
    useEffect(() => {
        if (newProjectFetcher.data && newProjectFetcher.data.error) {
            showNotification({
                id: 'fetcherError',
                title: 'Ошибка!',
                message: newProjectFetcher.data.error,
                color: 'red',
                icon: <IconAlertCircle />,
            });
        }
        if (newProjectFetcher.data && !newProjectFetcher.data.error) {
            showNotification({
                id: 'fetcherError',
                title: 'Отлично!',
                message: `Проект "${newProjectFetcher.data.project.title}" создан!`,
                color: 'green',
                icon: <IconCheck />,
            });
        }
    }, [newProjectFetcher.data]);

    return (
        <>
            <HeroText
                titleStart="Генерация"
                titleHighlighted="блога с помощью Искусственного Интеллекта"
                titleEnd="в несколько кликов"
                description="Прошли те времена, когда создатели контента часами исследовали, писали и редактировали одну запись в блоге. С инструментами на основе ИИ создавать высококачественные статьи так же просто, как нажать несколько кнопок"
            />
            <PageTitle title={'Введите краткое, но ёмкое название блога'} />

            <Form onSubmit={submitNewProject}>
                <CreateProjectForm
                    error={newProjectFetcher?.data?.error}
                    description={'Например: "Генерация блога с помощью ИИ", "Производство мороженого"'}
                    descriptionProps={{
                        align: 'center',
                        pb: 'xs',
                    }}
                    disabled={newProjectFetcher.state != 'idle'}
                    isloading={newProjectFetcher.state != 'idle' ? '1' : ''}
                    value={newProject}
                    onChange={createNewProject}
                />
                {!isIdle && <WaitingMessages />}
            </Form>
            {!!projects.length && <PageTitle title={'Перейти к существующему проекту'} />}
            <Flex gap="lg" justify="center" align="flex-start" direction="column" wrap="wrap">
                {!!projects.length &&
                    projects.map((pr: Project) => (
                        <ProjectCard key={pr?.url} url={pr?.url} title={pr.title} created={pr.created} />
                    ))}

                {!projects.length &&
                    <Alert mt={'xl'} w={'100%'} icon={<IconAlertCircle size={26} />} variant="outline">
                        У Вас пока нет проектов... Создайте свой первый выше, введите название в форму.
                    </Alert>}
            </Flex>

            <Article
                height={450}
                title={'Генерация блога с помощью ИИ! Как? Почему?'}
                html={CreateProjectIndexArticle}
            />
        </>
    );
}
