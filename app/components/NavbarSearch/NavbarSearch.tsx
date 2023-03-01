import { createStyles, Navbar, TextInput, Code, Badge, Group, Tooltip, ScrollArea } from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons';
import type { NavbarSearchProps } from '../../types';
import { UserButton } from '../UserButton/UserButton';
import LogOutButton from '../LogOutButton';
import LoginButtons from '../auth/LoginButtons';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
        background: theme.colorScheme === 'dark' ? theme.colors.darkBlue[7] : theme.colors.gray[0],
        width: { sm: 200, lg: 300 },
    },

    section: {
        // marginLeft: -theme.spacing.md,
        // marginRight: -theme.spacing.md,
        // [theme.fn.smallerThan('sm')]: {
        //     marginLeft: 0,
        //     marginRight: 0,
        // },

        marginBottom: theme.spacing.md,

        '&:not(:last-of-type)': {
            borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.darkBlue[6] : theme.colors.gray[1]}`,
        },
    },

    searchCode: {
        fontWeight: 700,
        fontSize: 10,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[2]}`,
    },
    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },

    links: {
        // marginLeft: -theme.spacing.md,
        // marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    },
}));

export function NavbarSearch(props: NavbarSearchProps) {
    const { navBarLinks, addons = [] } = props;
    const { opened, toggle, user } = props;
    const { classes } = useStyles();

    const links = navBarLinks.map((item, i) => <LinksGroup index={i} {...item} key={item.label} />);

    return (
        <Navbar hidden={!opened} width={{ sm: 300 }} p="md" className={classes.navbar}>
            <Navbar.Section className={classes.section}>
                {user && (
                    <UserButton
                        image={user.avatar || ''}
                        name={user.name || 'User'}
                        email={user.email || '@'}
                        icon={<IconSelector size={14} stroke={1.5} />}
                    />
                )}
                {user && (
                    <Group align={'center'} grow m="xs">
                        <LogOutButton />
                        <Tooltip label="Токенов на балансе">
                            <Badge size="xl" variant="gradient" gradient={{ from: 'red', to: 'yellow', deg: 35 }}>
                                {user.tokens?.toLocaleString()} τ
                            </Badge>
                        </Tooltip>
                    </Group>
                )}
                {!user && <LoginButtons />}
            </Navbar.Section>

            <TextInput
                placeholder="Поиск"
                size="md"
                icon={<IconSearch size={16} stroke={1.5} />}
                rightSectionWidth={70}
                rightSection={<Code className={classes.searchCode}>Ctrl + K</Code>}
                styles={{ rightSection: { pointerEvents: 'none' } }}
                mb="sm"
            />
            <ScrollArea
                style={{
                    overflowX: 'hidden',
                }}
                scrollbarSize={6}
                type="auto"
            >
                <Navbar.Section grow className={classes.links}>
                    <div className={classes.linksInner}>{links}</div>
                </Navbar.Section>

                {addons && <Navbar.Section className={classes.section}>{addons.map((a) => a)}</Navbar.Section>}
            </ScrollArea>
        </Navbar>
    );
}
