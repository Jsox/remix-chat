import {
    TextInput,
    Text,
    Textarea,
    createStyles,
    Box,
    Flex,
    Kbd,
} from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
import { type Section } from '@prisma/client';
import RichEditorText from 'app/components/RichTextEditor';
import { useEffect } from 'react';
import { useForm } from '@mantine/form';
import { Form, useFetcher } from '@remix-run/react';
import { useHydrated } from 'remix-utils';
import ButtonCustom from '../../ButtonCustom';
import { IconAlertCircle, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

const useStyles = createStyles((theme) => {
    return {
        label: {
            fontSize: theme.fontSizes.sm,
            paddingTop: '1rem',
            paddingBottom: '0.3rem',
            fontWeight: 700,
        },
        input: {
            '& [disabled]': {
                color: theme.colors.gray[0],
            },
        },
    };
});

export default function SectionEditForm({ section }: { section: Section }) {
    const { classes } = useStyles();

    const {
        id: sid,
        Topics,
        active,
        chatCompletitionId,
        created,
        projectId,
        userId,
        slug,
        ...neededSectionProps
    } = section;

    // useEffect(() => {
    //         console.log(
    //             '🚀 ~ file: SectionEditForm.tsx:54 ~ SectionEditForm ~ section:',
    //             section
    //         );
    // }, [section]);

    const { id } = section;

    const labelProps = {
        className: classes.label,
    };
    const inputProps = {
        className: classes.input,
        size: 'md',
    };

    const form = useForm({
        initialValues: neededSectionProps,

        validate: {
            sectionTitle: (value) =>
                value.trim().length > 5 ? null : 'Мало букв в названии Раздела',
            sectionMetaDescription: (value) =>
                value.trim().length > 5
                    ? null
                    : 'Мало букв в мета-описании Раздела',
        },
    });

    const isDirty = form.isDirty();

    const updateSectionFetcher = useFetcher();

    const hydrated = useHydrated();

    useEffect(() => {
        const error = updateSectionFetcher.data?.error;
        if (error) {
            showNotification({
                id: 'fetcherError',
                title: 'Ошибка!',
                message: error,
                color: 'red',
                icon: <IconAlertCircle />,
            });
        }
        if (updateSectionFetcher?.data && !updateSectionFetcher?.data?.error) {
            form.resetDirty();
        }
    }, [updateSectionFetcher]);

    useEffect(() => {
        console.log(
            '🚀 ~ file: SectionEditForm.tsx:105 ~ SectionEditForm ~ neededSectionProps:',
            neededSectionProps
        );
        form.setValues(neededSectionProps);
        form.resetDirty();
    }, [section]);

    const idle = updateSectionFetcher.state === 'idle';

    const submitForm = () => {
        form.validate();
        if (form.isValid()) {
            <input type="hidden" name="action" value="" />;
            updateSectionFetcher.submit(
                { ...form.values, action: 'updateSection' },
                {
                    method: 'post',
                    action: `/api/update/section/${id}`,
                }
            );
        }
    };

    const kbdSave = () => {
        return (
            <>
                Сохранить <Kbd>Ctrl</Kbd>+<Kbd>S</Kbd>
            </>
        );
    };
    const text =
        updateSectionFetcher.state === 'submitting'
            ? 'Сохраняю...'
            : updateSectionFetcher.state === 'loading'
            ? 'Сохранили!'
            : isDirty
            ? 'Раздел изменен'
            : 'Сохранено';

    return (
        <>
            {!!hydrated && (
                <Form
                    onKeyDown={getHotkeyHandler([
                        ['mod+S', isDirty ? submitForm : () => {}],
                    ])}
                >
                    <TextInput
                        {...inputProps}
                        labelProps={labelProps}
                        label={'Заголовок раздела'}
                        aria-label={`Отредактируйте Заголовок раздела`}
                        name={'sectionTitle'}
                        {...form.getInputProps('sectionTitle')}
                    />
                    <TextInput
                        {...inputProps}
                        labelProps={labelProps}
                        label={'Мета заголовок раздела'}
                        aria-label={`Отредактируйте Мета заголовок раздела`}
                        name={'sectionMetaTitle'}
                        {...form.getInputProps('sectionMetaTitle')}
                    />
                    <Textarea
                        autosize
                        minRows={3}
                        {...inputProps}
                        labelProps={labelProps}
                        aria-label={`Отредактируйте Мета описание раздела`}
                        label={'Мета описание раздела'}
                        name={'sectionMetaDescription'}
                        {...form.getInputProps('sectionMetaDescription')}
                    />
                    <Textarea
                        display={'none'}
                        autosize
                        minRows={3}
                        {...inputProps}
                        labelProps={labelProps}
                        aria-label={`Отредактируйте HTML Описание раздела`}
                        label={'HTML Описание раздела'}
                        name={'sectionHtmlDescription'}
                        {...form.getInputProps('sectionHtmlDescription')}
                    />
                    <Box>
                        <Text {...labelProps}>HTML Описание раздела</Text>
                        <RichEditorText
                            html={
                                form.values.sectionHtmlDescription
                            }
                            onChange={
                                form.getInputProps('sectionHtmlDescription')
                                    .onChange
                            }
                        />
                    </Box>

                    <TextInput
                        {...inputProps}
                        labelProps={labelProps}
                        label={'Ключевые слова раздела (через запятую)'}
                        aria-label={`Отредактируйте Ключевые слова раздела`}
                        name={'sectionKeyWords'}
                        {...form.getInputProps('sectionKeyWords')}
                    />
                    <Flex align={'center'} justify={'space-between'} ta={'end'}>
                        <Text mt={'lg'} c={!isDirty ? 'green.9' : 'red.9'}>
                            {text}
                        </Text>

                        <ButtonCustom
                            // loading={!idle}
                            // loaderPosition={'center'}
                            mt={'lg'}
                            onClick={submitForm}
                            disabled={!isDirty || !idle}
                            Icon={IconCheck}
                            avatarColor={'green'}
                            title={kbdSave()}
                            desc={'все изменения в разделе'}
                            aria-label="Сохранить изменения в Разделе"
                        />
                    </Flex>
                </Form>
            )}
        </>
    );
}
