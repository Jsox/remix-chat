import { Text } from '@mantine/core';
import { useActionData } from '@remix-run/react';
import InputChatForm from 'app/components/InputChatForm';
import Layout from 'app/layouts/Layout';

export default function Test() {
    const fromAi = useActionData();

    const user = {
        fingerprint: 'fd58e6c09ad3804e357c4a28b0c325fa',
    };

    return (
        <Layout>
            <Text>{fromAi as string}</Text>
            <InputChatForm user={user} />
        </Layout>
    );
}
