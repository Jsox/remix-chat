import { AppShell, Aside, Text, MediaQuery, Container, ScrollArea } from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { NavbarSearch } from './../components/NavbarSearch/NavbarSearch';
import { HeaderAction } from './../components/HeaderAction/HeaderAction';
import { headerTopLinks } from '../data/links';
import { useColors } from '../hooks/useColors';
import { useContext, useEffect } from 'react';
import { useCatch, useLoaderData } from '@remix-run/react';
import { DataContext } from '../data/DataContext';

export function CatchBoundary() {
    const caught = useCatch();

    return (
        <div>
            <h1>Caught</h1>
            <p>Status: {caught.status}</p>
            <pre>
                <code>{JSON.stringify(caught.data, null, 2)}</code>
            </pre>
        </div>
    );
}

export default function Layout(props: any) {
    const { bodyStyles } = useColors();
    const [opened, { toggle }] = useDisclosure(false);
    const [scrollLocked, setScrollLocked] = useScrollLock();

    const { user } = useContext(DataContext);

    useEffect(() => {
        setScrollLocked(opened);
    }, [opened]);

    return (
        <AppShell
            styles={{
                main: { ...bodyStyles },
            }}
            navbarOffsetBreakpoint="md"
            asideOffsetBreakpoint="lg"
            navbar={NavbarSearch({ user, opened, toggle })}
            aside={
                <MediaQuery smallerThan="lg" styles={{ display: 'none' }}>
                    <Aside style={{ background: 'transparent' }} p="md" width={{ lg: 250, xl: 300 }}>
                        <Text>Application sidebar</Text>
                    </Aside>
                </MediaQuery>
            }
            // footer={<FooterLinks data={dataFooterLinks} />}
            header={HeaderAction({ links: headerTopLinks.mainLinks, opened, toggle })}
        >
            {props.children}
        </AppShell>
    );
}
