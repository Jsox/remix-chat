import { Paper, Textarea, Button, Code } from '@mantine/core';
import { useInputState } from '@mantine/hooks';
import { useFetcher } from '@remix-run/react';
import Layout from 'app/layouts/Layout';

export default function AI21() {
    const ai21Fetcher = useFetcher();
    const [aiTestValue, setAiTestValue] = useInputState('Write an paragraph about Russia');

    const aiTest = () => {
        ai21Fetcher.submit({ prompt: aiTestValue }, { action: '/api/ai21', method: 'post' });
    };

    return (
        <Layout>
            <Paper p={'xl'} m={'xl'}>
                <Textarea label="ai21" description="Input description" value={aiTestValue} onChange={setAiTestValue} />
                <Button onClick={aiTest}>ai21</Button>

                {/* {ai21Fetcher?.data && <Prism language="json">{ai21Fetcher.data}</Prism>} */}
                <Code>{JSON.stringify(ai21Fetcher.data, null, '\t')}</Code>
            </Paper>
        </Layout>
    );
}
