import { Box, Button, Grid, Input } from '@mantine/core';
import { IconQuestionMark, IconSend } from '@tabler/icons';
import { useColors } from './../hooks/useColors';
import useBreakpoints from './../hooks/useBreakpoint';
import { useFetcher, useNavigation } from '@remix-run/react';
import { useInputState } from '@mantine/hooks';

export default function InputChatForm() {
    const { isXs } = useBreakpoints();
    const transition = useNavigation();
    const isSubmitting = transition.state !== 'idle';
    const { primaryStyles, primaryTextColor } = useColors();
    const [stringValue, setStringValue] = useInputState('');
    const fetcher = useFetcher();
    const onSubmit = (e) => {
        // e.preventDefault();
        setStringValue('');
    };

    return (
        <Box sx={{ maxWidth: 'md' }} mx="auto">
            <fetcher.Form method="post" onSubmit={onSubmit}>
                <Grid align={'end'}>
                    <Input
                        onChange={(event) => setStringValue(event.currentTarget.value)}
                        w={'100%'}
                        mr={35}
                        value={stringValue}
                        aria-label="Введите запрос"
                        icon={<IconQuestionMark />}
                        c={primaryTextColor}
                        size={isXs ? 'md' : 'xl'}
                        rightSection={
                            <Button
                                aria-label="Отправить запрос"
                                color={primaryStyles.backgroundColor}
                                size={isXs ? 'md' : 'xl'}
                                px={isXs ? 'xs' : 'lg'}
                                radius={'sm'}
                                loaderPosition="center"
                                loading={isSubmitting}
                                disabled={isSubmitting}
                                variant={'filled'}
                                type="submit"
                            >
                                <IconSend size={26} />
                            </Button>
                        }
                        name="question"
                        placeholder="Напишите свой вопрос"
                    />
                </Grid>
            </fetcher.Form>
        </Box>
    );
}
