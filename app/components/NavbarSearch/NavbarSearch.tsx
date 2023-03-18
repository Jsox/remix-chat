import {
    createStyles,
    Navbar,
    TextInput,
    Code,
    Badge,
    Group,
    Tooltip,
    ScrollArea,
    rem,
} from '@mantine/core';
import { IconSearch, IconSelector } from '@tabler/icons';
import type { NavbarSearchProps } from '../../types';
import { UserButton } from '../UserButton/UserButton';
import LogOutButton from '../LogOutButton';
import LoginButtons from '../auth/LoginButtons';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { useOutletContext } from '@remix-run/react';
import CountUp from 'react-countup';
import { useHydrated } from 'remix-utils';
import { type IOutletContext } from 'app/root';
import { useColors } from 'app/hooks/useColors';

const useStyles = createStyles((theme) => ({
    navbar: {
        paddingTop: 0,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[7]
                : theme.colors.gray[0],
        // width: { sm: 200, lg: 300 },
        // width: 300,
        borderColor:
            theme.colorScheme === 'dark'
                ? theme.colors.darkBlue[6]
                : theme.colors.gray[1],
    },
    section: {
        marginBottom: theme.spacing.md,
        '&:not(:last-of-type)': {
            borderBottom: `1px solid ${
                theme.colorScheme === 'dark'
                    ? theme.colors.darkBlue[6]
                    : theme.colors.gray[1]
            }`,
        },
    },
    searchCode: {
        fontWeight: 700,
        fontSize: 10,
        backgroundColor:
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[0],
        border: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[7]
                : theme.colors.gray[2]
        }`,
    },
    header: {
        padding: theme.spacing.md,
        paddingTop: 0,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        borderBottom: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
    linksInner: {
        // paddingTop: theme.spacing.md,
        // paddingBottom: theme.spacing.md,
        padding: `${theme.spacing.md} 0 `,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        borderTop: `1px solid ${
            theme.colorScheme === 'dark'
                ? theme.colors.dark[4]
                : theme.colors.gray[3]
        }`,
    },
}));

export function NavbarSearch(props: NavbarSearchProps) {
    const { navBarLinks, addons = [] } = props;
    const { opened, toggle } = props;
    const { classes } = useStyles();
    const { user, userTokens } = useOutletContext<IOutletContext>();

    const links = navBarLinks.map((item, i) => (
        <LinksGroup index={i} {...item} key={item.label} />
    ));

    const { mainGradient } = useColors();

    const gradientTokens =
        userTokens < 1 ? { from: 'red', to: 'grape', deg: 35 } : mainGradient;

    return (
        <Navbar
            px={{ md: 'xs', lg: 'xl' }}
            hidden={!opened}
            width={{ md: 270, lg: 300, xl: 330 }}
            p="md"
            className={classes.navbar}
        >
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
                            <Badge
                                size="xl"
                                variant="gradient"
                                gradient={gradientTokens}
                            >
                                <CountUp
                                    delay={0}
                                    start={0}
                                    suffix=" τ"
                                    decimals={0}
                                    separator=" "
                                    end={userTokens}
                                />
                                {/* {userTokens.toLocaleString()} τ */}
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
                rightSection={
                    <Code className={classes.searchCode}>Ctrl + K</Code>
                }
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

                {addons && (
                    <Navbar.Section className={classes.section}>
                        {addons.map((a) => a)}
                    </Navbar.Section>
                )}
            </ScrollArea>
        </Navbar>
    );
}
