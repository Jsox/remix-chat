import { Center, Divider, Flex, Group } from '@mantine/core';
import { Form } from '@remix-run/react';
import { GithubButton, GoogleButton } from '../SocialButtons/SocialButtons';

export default function LoginButtons() {
    return (
        <Flex direction={'column'} mb={0}>
            {/* <Center>Войти с помощью:</Center> */}
            <Divider label="Войти с помощью" labelPosition="center" my="xs" />
            <Group grow my="xs">
                <Form action="/auth/github" method="post">
                    <GithubButton w={'100%'} radius="xl" type="submit" aria-label="Авторизация с помощью Github">
                        Github
                    </GithubButton>
                </Form>
                <Form action="/auth/google" method="post">
                    <GoogleButton w={'100%'} radius="xl" type="submit" aria-label="Авторизация с помощью Google">
                        Google
                    </GoogleButton>
                </Form>
            </Group>
        </Flex>
    );
}
