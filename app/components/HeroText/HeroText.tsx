import { createStyles, Title, Text, Container } from '@mantine/core';
import { type ReactElement, type ReactNode } from 'react';
import { Dots } from './Dots';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        // paddingTop: 60,
        // paddingBottom: 30,

        // '@media (max-width: 755px)': {
        //     paddingTop: 30,
        //     paddingBottom: 30,
        // },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    dots: {
        position: 'absolute',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

        '@media (max-width: 755px)': {
            display: 'none',
        },
    },

    dotsLeft: {
        left: 0,
        top: 0,
    },

    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 40,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xs,
        // fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        '@media (max-width: 520px)': {
            fontSize: 28,
            // textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 9],
    },

    description: {
        textAlign: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.gray[4] : theme.colors.gray[8],
        '@media (max-width: 520px)': {
            fontSize: theme.fontSizes.md,
        },
    },

    controls: {
        marginTop: theme.spacing.lg,
        display: 'flex',
        justifyContent: 'center',

        '@media (max-width: 520px)': {
            flexDirection: 'column',
        },
    },

    control: {
        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        '@media (max-width: 520px)': {
            height: 42,
            fontSize: theme.fontSizes.md,

            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },
}));

interface IOpts {
    titleStart: string | ReactElement;
    titleHighlighted: string;
    titleEnd: string;
    description: string | ReactElement;
    controls?: ReactNode | null;
}

export function HeroText(opts: IOpts) {
    const { titleStart, titleEnd, titleHighlighted, description, controls = null, ...props } = opts;
    const { classes } = useStyles();

    return (
        <Container pt={{ base: 20, sm: 40, md: 50, lg: 60 }} pb={{ base: 20 }} className={classes.wrapper} size={1400}>
            <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
            <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
            <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

            <div className={classes.inner} {...props}>
                <Title  className={classes.title}>
                    {titleStart}{' '}
                    <Text component="span" className={classes.highlight} inherit>
                        {titleHighlighted}
                    </Text>{' '}
                    {titleEnd}
                </Title>

                <Container p={0} size={800}>
                    <Text size="lg" color="dimmed" className={classes.description}>
                        {description}
                    </Text>
                </Container>

                {controls && <div className={classes.controls}>{controls}</div>}
            </div>
        </Container>
    );
}
