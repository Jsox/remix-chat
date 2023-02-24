import { json, redirect, type ActionArgs } from '@remix-run/node';
import Layout from '../../../layouts/Layout';
import { useEffect, useRef, useState } from 'react';
import { useEventSource, useSubscribe } from 'remix-sse/client';
import { Form, Outlet, useFetcher } from '@remix-run/react';
import { BlogGenerator } from '../../../lib/ai-blog.server';
import { Alert, Button, Checkbox, Flex } from '@mantine/core';
import WaitingMessages from '../../../components/WaitingMessages';
import { CheckboxCard } from '../../../components/CheckboxCard/CheckboxCard';
import clearTextForJson from '../../../lib/clearTextForJson';
import { Yandex } from 'yandex-cloud-translate';
import CreateProjectForm from 'app/components/blog/CreateProjectForm';
import { useInputState } from '@mantine/hooks';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
// import { showNotification } from '@mantine/core';

// import * as dotenv from 'dotenv';
// import { useInputState } from '@mantine/hooks';
// dotenv.config();

export async function action({ request }: ActionArgs) {
    const form = await request.formData();
    const query = await form.get('query');
    const model = await form.get('model');
    const reError = (error = 'Ошибка 1') => {
        return json({
            text: error,
            model,
            usage: {},
        });
    };

    const generateBlogSections = new BlogGenerator(model, query, 2);

    const result = await generateBlogSections.run();

    if (result.error) {
        reError(result.error);
    }

    let text = result?.choices[0].text.trim();
    text = clearTextForJson(text);
    console.log({ text });

    const dJSON = require('dirty-json');
    const jsonArr = dJSON.parse(text);
    console.log({ ServerJsonArr: jsonArr });

    return json({
        jsonArr,
        text,
        model,
        usage: result?.usage,
    });
}

// export async function loader({ request, context }: LoaderArgs) {
//     const ya = new Yandex();

//     const transd = await ya.translate({
//         to: 'ru',
//         texts: ['Prestashop Module for Your Store', 'How to Pick the Right '],
//     });
//     console.log({ translate: JSON.stringify(transd, null, 2) });
//     return json({
//         text: 'qwe',
//     });
// }

export default function GenerateProject() {
    // const { user } = useContext(DataContext);

    const fetcher = useFetcher();
    const isIdle = fetcher.state === 'idle';

    useEventSource('/api/emitter');
    const count = useSubscribe('/api/emitter', 'count');
    const greeting = useSubscribe('/api/emitter', 'greeting');

    const codeRef = useRef();

    const [topicsTitles, setTopicsTitles] = useState([]);

    useEffect(() => {
        try {
            if (fetcher.data) {
                console.log({ data: fetcher.data });

                const text = fetcher.data.text;
                console.log({ cleanText: text });
                const jsonArr = fetcher.data.jsonArr;
                console.log({ jsonArr });

                switch (fetcher.data.model) {
                    case 'generateBlogSectionTopicsTitles':
                        // const dJSON = require('dirty-json');
                        // const jsonArr = dJSON.parse(text);
                        console.log({ jsonArr });
                        console.log(typeof jsonArr);

                        if (typeof jsonArr == 'object') {
                            setTopicsTitles((prev) => prev.concat(jsonArr));
                        }

                        break;

                    default:
                        break;
                }
            }
        } catch (error) {
            console.log({ error });
        }
        // console.log((codeRef.current.innerHTML = count));
    }, [fetcher.data]);

    const click = () => {
        fetcher.submit(
            {
                query: 'Prestashop modules',
                model: 'generateBlogSectionTopicsTitles',
            },
            {
                method: 'post',
            }
        );
        console.log('go');
    };

    const [newProject, createNewProject] = useInputState('');
    const newProjectFetcher = useFetcher();

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

    return (
        <>
            <Form onSubmit={submitNewProject}>
                <CreateProjectForm
                    isLoading={newProjectFetcher.state != 'idle'}
                    value={newProject}
                    onChange={createNewProject}
                />
            </Form>
            <Flex mih={500} gap="md" justify="center" align="flex-start" direction="column" wrap="wrap">
                {topicsTitles.map(
                    (topic, i) => (
                        <CheckboxCard
                            key={topic.topicTitle}
                            title={topic.topicTitle}
                            description={topic.topicMetaDescription}
                        />
                    )

                    // return <Checkbox key={i} value={topic.topicTitle} label={topic.topicTitle} />;
                )}

                <CheckboxCard
                    title={'How to Pick the Right Prestashop Module for Your Store'}
                    description={'Discover how to choose the right Prestashop module to fit the needs of your store'}
                />
            </Flex>
            {!isIdle && <WaitingMessages />}
            <Button loading={!isIdle} onClick={click}>
                GO
            </Button>
            <code ref={codeRef}></code>
            <code>{fetcher.data && JSON.stringify(fetcher.data.usage)}</code>
        </>
    );
}
