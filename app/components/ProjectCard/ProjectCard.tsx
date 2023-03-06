import {
    UnstyledButton,
    Text,
    createStyles,
    Box,
    Title,
    Flex,
    Grid,
    Center,
    Stack,
    Badge,
    BackgroundImage,
} from '@mantine/core';
import { type Project } from '@prisma/client';
import { NavLink } from '@remix-run/react';
import { IconStack2, IconStack3, IconStackPop } from '@tabler/icons';
import { useColors } from 'app/hooks/useColors';
import { useTime } from '../../hooks/useTime';

const useStyles = createStyles((theme) => ({
    button: {
        display: 'flex',
        // color:
        //     theme.colorScheme === 'dark'
        //         ? theme.colors.gray[0]
        //         : theme.colors.gray[0],
        width: '100%',
        border: `1px solid ${theme.colorScheme === 'dark'
            ? theme.colors.darkBlue[9]
            : theme.colors.gray[2]
            }`,
        borderRadius: theme.radius.sm,
        padding: theme.spacing.lg,
        transition: 'all 0.3s ease',
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[6]
                : theme.colors.gray[1],
        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.darkBlue[8]
                    : theme.colors.gray[2],
        },
    },
}));

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({
    project,
    className,
    ...others
}: ProjectCardProps &
    Omit<React.ComponentPropsWithoutRef<'button'>, keyof ProjectCardProps>) {
    const { title, created, url, Sections, Topics } = project;
    const { classes, cx } = useStyles();
    const { fromNow } = useTime(created);

    return (
        <UnstyledButton
            aria-label={'Проект: ' + title}
            to={url}
            component={NavLink}
            {...others}
            className={cx(classes.button, className)}
        >
            <Flex
                direction={'column'}
                gap={'sm'}
                w={'100%'}
                tabIndex={-1}
                style={{
                    position: 'relative',
                }}
                // mr="xl"
                styles={{
                    input: { cursor: 'pointer' },
                }}
            >
                <IconStackPop
                    style={{
                        position: 'absolute',
                        right: 10,
                        top: 10,
                    }}
                />

                <Title
                    align="center"
                    fw={300}
                    order={3}
                    size={'h3'}
                    my={7}
                    pr={35}
                // sx={{ lineHeight: 1 }}
                >
                    {title}
                </Title>
                {/* <BackgroundImage
                    src={'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80'}> */}
                <Grid grow>
                    <Grid.Col xs={6} sm={4}>
                        <DCon title={'Разделов'} data={Sections.length} />
                    </Grid.Col>
                    <Grid.Col xs={6} sm={4}>
                        <DCon title={'Статей'} data={Topics.length} />
                    </Grid.Col>
                    <Grid.Col xs={12} sm={4}>
                        <DCon title={'Создан'} data={fromNow} />
                    </Grid.Col>
                </Grid>
                {/* </BackgroundImage> */}
            </Flex>
        </UnstyledButton>
    );
}

export function DCon({ title, data }: any) {
    const { primaryBackgroundColor, primaryTextColor } = useColors();
    return (
        <Stack
            py={'sm'}
            align="center"
            spacing={5}
            sx={(theme) => ({
                backgroundColor:
                    theme.colorScheme === 'dark'
                        ? theme.colors.darkBlue[7]
                        : theme.colors.gray[1],
                color:
                    theme.colorScheme === 'dark'
                        ? theme.colors.dark[0]
                        : theme.colors.gray[8],
            })}
        >
            <Text fz="xs" tt="uppercase" fw={700}>
                {title}
            </Text>
            {/* <Text fz="md" fw={400}> */}
            <Badge c={primaryTextColor} bg={data == '0' ? 'blue' : primaryBackgroundColor} size="md">{data}</Badge>
            {/* </Text> */}
        </Stack>
    );
}
