import { Box, Button, Grid, Group, Input, SimpleGrid, Textarea, TextInput, useMantineTheme } from '@mantine/core';
import { IconQuestionMark, IconSend } from '@tabler/icons';
import { useHydrated } from 'remix-utils';
import { useColors } from './../hooks/useColors';
import useBreakpoints from './../hooks/useBreakpoint';
import { Form, useTransition } from '@remix-run/react';

export default function InputChatForm({ user }) {
    const { isXs, smallerSm } = useBreakpoints();
    const transition = useTransition();
    const isSubmitting = transition.state !== 'idle';
    const { primaryStyles, primaryTextColor } = useColors();

    // hydrated ? (
    return (
        <Box sx={{ maxWidth: 'md' }} mx="auto">
            <Form method="post" action="/api/getAiAnswer">
                <Grid align={'end'}>
                    {/* <Grid.Col span={12}> */}
                    <Input
                        w={'100%'}
                        mr={35}
                        aria-label="Введите запрос"
                        icon={<IconQuestionMark />}
                        c={primaryTextColor}
                        size={isXs ? 'md' : 'xl'}
                        rightSection={
                            <Button
                                aria-label="Отправить запрос"
                                // style={{ ...primaryStyles }}
                                color={primaryStyles.backgroundColor}
                                size={isXs ? 'md' : 'xl'}
                                px={isXs ? 'xs' : 'lg'}
                                radius={'sm'}
                                disabled={isSubmitting || !user.id}
                                variant={'filled'}
                                type="submit"
                            >
                                <IconSend size={26} />
                            </Button>
                        }
                        // value={formValue}
                        // onChange={(e) => setFormValue(e.target.value)}
                        name="question"
                        placeholder="Напишите свой вопрос"
                        // label={isXs ? '' : 'Пообщаемся?'}
                    />
                    {/* <input type="hidden" name="userFingerprint" value={user.fingerprint} /> */}
                    {/* </Grid.Col> */}
                    {/* <Grid.Col span={smallerSm ? 3 : 2}>
                        <Button
                            aria-label="Отправить запрос"
                            // style={{ ...primaryStyles }}
                            color={primaryStyles.backgroundColor}
                            size={isXs ? 'md' : 'xl'}
                            px={isXs ? 'xs' : 'lg'}
                            radius={'sm'}
                            disabled={isSubmitting || !user.id}
                            variant={'filled'}
                            type="submit"
                        >
                            <IconSend size={26} />
                        </Button>
                    </Grid.Col> */}
                </Grid>
            </Form>
        </Box>
    );
    // ) : (
    //     <Box sx={{ maxWidth: 'md' }} mx="auto">
    //         секунду...
    //     </Box>
    // );
}
