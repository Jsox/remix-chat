import { AppShell, Aside, MediaQuery, ScrollArea } from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { NavbarSearch } from './../components/NavbarSearch/NavbarSearch';
import { HeaderAction } from './../components/HeaderAction/HeaderAction';
import { headerTopLinks, navBarLinks } from '../data/links';
import { useColors } from '../hooks/useColors';
import { useEffect } from 'react';
import { useOutletContext } from '@remix-run/react';
import useBreakpoints from '../hooks/useBreakpoint';
import { type LinksFunction } from '@remix-run/node';

export default function Layout(props: any) {


    // console.log({ state });

    const { navBarLinksAddon = [], aside = [], user }: any = useOutletContext() || {};

    const { bodyStyles } = useColors();
    const [opened, { toggle }] = useDisclosure(false);
    const [scrollLocked, setScrollLocked] = useScrollLock();

    const newNavBarLinks = navBarLinks.concat(navBarLinksAddon);
    const { smallerLg } = useBreakpoints();

    useEffect(() => {
        setScrollLocked(opened);
    }, [opened]);

    // useEffect(() => {
    //     console.log({ states });
    // }, [states]);

    const asideContent = Array.isArray(aside) ? aside.map((c, i) => <div key={i}>{c}</div>) : null;

    return (

        <AppShell
            styles={{
                main: { ...bodyStyles },
            }}
            navbarOffsetBreakpoint="md"
            asideOffsetBreakpoint="lg"
            navbar={
                <NavbarSearch
                    navBarLinks={newNavBarLinks}
                    addons={smallerLg ? asideContent : null}
                    user={user}
                    opened={opened}
                    toggle={toggle}
                />
            }
            aside={
                <MediaQuery smallerThan={'lg'} styles={{ display: 'none' }}>
                    <Aside style={{ background: 'transparent' }} p="md" width={{ lg: 250, xl: 300 }}>
                        <ScrollArea>{asideContent}</ScrollArea>
                    </Aside>
                </MediaQuery>
            }
            // footer={<FooterLinks data={dataFooterLinks} />}
            header={HeaderAction({ links: headerTopLinks.mainLinks, opened, toggle })}
        >
            {props.children}
            {/* <MediaQuery largerThan={'lg'} styles={{ display: 'none' }}>
                <ActionIcon color="grape" size="lg" radius="xs" variant="filled">
                    <IconQuestionMark size={26} />
                </ActionIcon>
            </MediaQuery> */}
        </AppShell>
    );
}
