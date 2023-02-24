import { AppShell, Aside, Text, MediaQuery, Container, ScrollArea, ActionIcon } from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { NavbarSearch } from './../components/NavbarSearch/NavbarSearch';
import { HeaderAction } from './../components/HeaderAction/HeaderAction';
import { headerTopLinks } from '../data/links';
import { useColors } from '../hooks/useColors';
import { useContext, useEffect } from 'react';
import { useCatch, useLoaderData } from '@remix-run/react';
import { DataContext } from '../data/DataContext';
import useBreakpoints from '../hooks/useBreakpoint';
import { IconQuestionMark } from '@tabler/icons';

export default function Layout(props: any) {
    const { aside } = props;
    const { bodyStyles } = useColors();
    const [opened, { toggle }] = useDisclosure(false);
    const [scrollLocked, setScrollLocked] = useScrollLock();

    const { user } = useContext(DataContext);
    const { smallerLg } = useBreakpoints();

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
                <>
                    <MediaQuery largerThan={'lg'} styles={{ display: 'none' }}>
                        <ActionIcon color="grape" size="lg" radius="xs" variant="filled">
                            <IconQuestionMark size={26} />
                        </ActionIcon>
                    </MediaQuery>
                    <MediaQuery smallerThan={'lg'} styles={{ display: 'none' }}>
                        <Aside style={{ background: 'transparent' }} p="md" width={{ lg: 250, xl: 300 }}>
                            <ScrollArea>{Array.isArray(aside) && aside.map((c) => c)}</ScrollArea>
                        </Aside>
                    </MediaQuery>
                </>
            }
            // footer={<FooterLinks data={dataFooterLinks} />}
            header={HeaderAction({ links: headerTopLinks.mainLinks, opened, toggle })}
        >
            {props.children}
        </AppShell>
    );
}
