import { Box, Button, Divider, Flex, Group, Text, Stack } from '@mantine/core';
import { Form } from '@remix-run/react';
import { IconLogin } from '@tabler/icons';
import { GithubButton, GoogleButton } from '../SocialButtons/SocialButtons';

export default function LoginButtons() {
    return (
        <Flex direction={'column'} mb={0}>
            <Divider
                label={
                    <>
                        <IconLogin />
                        <Text ml={5}>Войти с помощью</Text>
                    </>
                }
                labelPosition="center"
                my="xs"
            />
            <Stack spacing={0}>
                <Group grow my="xs" noWrap={false}>
                    <Form action="/auth/github" method="post">
                        <GithubButton
                            w={'100%'}
                            radius="xl"
                            type="submit"
                            aria-label="Авторизация с помощью Github"
                        >
                            Github
                        </GithubButton>
                    </Form>
                    <Form action="/auth/google" method="post">
                        <GoogleButton
                            w={'100%'}
                            radius="xl"
                            type="submit"
                            aria-label="Авторизация с помощью Google"
                        >
                            Google
                        </GoogleButton>
                    </Form>
                </Group>{' '}
                <Group grow my="xs" noWrap={false}>
                    <Form action="/auth/telegram" method="post">
                        <Button
                            w={'100%'}
                            radius="xl"
                            type="submit"
                            aria-label="Авторизация с помощью Telegram"
                        >
                            Telegram
                        </Button>
                    </Form>
                    {/* <Box>
                    <script async src="https://telegram.org/js/telegram-widget.js?21" data-telegram-login="AiWritesbot" data-size="large" data-auth-url="http://localhost:3000/auth/telegram/callback"></script>
                </Box> */}
                </Group>
            </Stack>
        </Flex>
    );
}
