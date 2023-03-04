import { Container, createStyles, Title, Text, Spoiler, Divider, Box, TypographyStylesProvider } from '@mantine/core';
import { useElementSize } from '@mantine/hooks';
import { IconArticle } from '@tabler/icons';
import { useColors } from 'app/hooks/useColors';

interface IArticleProps {
    title: string;
    html: string;
    height?: number;
}
const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: 60,
        paddingBottom: 60,

        '@media (max-width: 755px)': {
            paddingTop: 40,
            paddingBottom: 40,
        },
        // color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    },
    title: {
        textAlign: 'center',
        fontWeight: 700,
        fontSize: 30,
        letterSpacing: -1,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        marginBottom: theme.spacing.xl,

        '@media (max-width: 520px)': {
            fontSize: 28,
            textAlign: 'left',
        },
    },
    text: {
        fontFamily: `sans-serif, ${theme.fontFamily}`,
        columnGap: 40,
        color: theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[9],
        fontSize: theme.fontSizes.lg,
        columnRule: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]}`,
        MozColumnGap: 40,
        MozColumnRule: `1px dotted ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]}`,
        WebkitColumnGap: 40,
        WebkitColumnRule: `1px dotted ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[2]}`,
        textAlign: 'justify',
        '@media (max-width: 755px)': {
            fontSize: theme.fontSizes.md,
        },
        // '@media (min-width: 1400px)': {
        //     fontSize: theme.fontSizes.md,
        //     columnCount: 3,
        //     mozColumnCount: 3,
        //     webkitColumnCount: 3,
        // },
        '@media (min-width: 1900px)': {
            fontSize: theme.fontSizes.lg,
        },
        '& h3, h2, h4': {
            letterSpacing: -1,
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },
}));

export default function Article(props: IArticleProps) {
    const { gradientTitleColor } = useColors();
    const { classes } = useStyles();
    const { title, html, height } = props;
    const { ref, width } = useElementSize();

    let columns = width < 755 ? 1 : width > 1200 ? 3 : 2;

    const style = {
        columnCount: columns,
        MozColumnCount: columns,
        WebkitColumnCount: columns,
    };

    const content = (
        <TypographyStylesProvider>
            <Text style={{ ...style }} ref={ref} className={classes.text}>
                <div dangerouslySetInnerHTML={{ __html: html }}></div>
            </Text>
        </TypographyStylesProvider>
    );

    return (
        <Container className={classes.wrapper} size={'xl'}>
            <>
                <Divider
                    label={
                        <>
                            <IconArticle size={12} />
                            <Box fs={'md'} mx={5}>
                                статья по теме
                            </Box>
                        </>
                    }
                    labelPosition="center"
                    mb={'xl'}
                />
                <Title gradient={gradientTitleColor} variant={'gradient'} order={2} size={2} className={classes.title}>
                    {title}
                </Title>
                {height && (
                    <Spoiler maxHeight={height} showLabel="Показать больше" hideLabel="Свернуть">
                        {content}
                    </Spoiler>
                )}
                {!height && content}
            </>
        </Container>
    );
}
