import { useState } from 'react'
import {
    Group,
    Box,
    Collapse,
    ThemeIcon,
    Text,
    UnstyledButton,
    createStyles,
} from '@mantine/core'
import {
    IconChevronLeft,
    IconChevronRight,
    type TablerIcon,
} from '@tabler/icons'
import { NavLink } from '@remix-run/react'


const useStyles = createStyles(theme => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.md,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 400,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[0]
                : theme.colors.gray[7],
        borderLeft: `1px solid ${theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[3]
            }`,

        '&:hover': {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.dark[7]
                    : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
        [`&.active`]: {
            backgroundColor:
                theme.colorScheme === 'dark'
                    ? theme.colors.blue[9]
                    : theme.colors.blue[6],
            color: theme.white,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}))

interface LinksGroupProps {
    icon: TablerIcon
    label: string
    initiallyOpened?: boolean
    link?: string
    links?: { label: string; link: string }[]
    index?: number
}

export function LinksGroup({
    index = 0,
    link,
    icon: Icon,
    label,
    initiallyOpened,
    links,
}: LinksGroupProps) {
    // const scaleY = {
    //     in: { opacity: 1, transform: 'scaleY(1)' },
    //     out: { opacity: 0, transform: 'scaleY(0)' },
    //     common: { transformOrigin: 'top' },
    //     transitionProperty: 'transform, opacity',
    // };

// const [mounted, setMounted] = useState(false);


    // useEffect(() => {
    //     setTimeout(() => {
    //         setMounted(true);
    //     }, index * 150);
    // }, []);


    const { classes, theme } = useStyles()
    const hasLinks = Array.isArray(links)
    const [opened, setOpened] = useState(initiallyOpened || false)
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft

    const items = (hasLinks ? links : []).map((link, i) => (
        <Text<typeof NavLink>
            key={link.label}
            component={NavLink}
            prefetch={'intent'}
            className={classes.link}
            to={link.link}
            // onClick={(event) => event.preventDefault()}
            aria-label={`${label} - ${link.label}`}
            title={`${label} - ${link.label}`}
        >
            {link.label}
        </Text>
    ))

    let append = {}

    if (link && !hasLinks) {
        append = {
            component: NavLink,
            to: link,
            prefetch: 'intent',
            'aria-label': label,
            title: label,
        }
    }

    return (
        <>
            <UnstyledButton
                {...append}
                onClick={() => setOpened(o => !o)}
                className={classes.control}
            >
                <Group position='apart' spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant='light' size={30}>
                            <Icon size={22} />
                        </ThemeIcon>
                        <Box ml='md'>{label}</Box>

                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size={14}
                            stroke={1.5}
                            style={{
                                transform: opened
                                    ? `rotate(90deg)`
                                    : 'rotate(-90deg)',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    )
}
