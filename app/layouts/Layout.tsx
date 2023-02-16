import { AppShell, Aside, Text, MediaQuery, Container, ScrollArea } from '@mantine/core';
import { useDisclosure, useScrollLock } from '@mantine/hooks';
import { NavbarSearch } from './../components/NavbarSearch/NavbarSearch';
import { HeaderAction } from './../components/HeaderAction/HeaderAction';
import { headerTopLinks } from '../data/links';
import { useColors } from '../hooks/useColors';
import { useEffect } from 'react';

export default function Layout(props: any) {
    const { bodyStyles } = useColors();
    const [opened, { toggle }] = useDisclosure(false);
    const [scrollLocked, setScrollLocked] = useScrollLock();

    useEffect(() => {
        setScrollLocked(opened);
    }, [opened]);

    return (
        <AppShell
            styles={{
                main: { ...bodyStyles },
                // minHeight: '100vh',
            }}
            navbarOffsetBreakpoint="md"
            asideOffsetBreakpoint="lg"
            navbar={NavbarSearch({ opened, toggle })}
            // navbar={
            //     <Navbar
            //         styles={{
            //             background: theme.colorScheme === 'dark' ? theme.colors.darkBlue[9] : theme.colors.gray[0],
            //         }}
            //         p="md"
            //         hiddenBreakpoint="sm"
            //         hidden={!opened}
            //         width={{ sm: 200, lg: 300 }}
            //     >
            //         <Text>Application navbar</Text>
            //     </Navbar>
            // }
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
            {/* <ScrollArea style={{ height: '100%' }} type='scroll'>
				<Container m={0} p={0} style={{ minHeight: '100%' }} size={'xl'}> */}
            {props.children}
            {/* </Container>
			</ScrollArea> */}
        </AppShell>
    );
}
