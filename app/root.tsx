import { json, type LoaderArgs, type MetaFunction } from '@remix-run/node';
import { type PropsWithChildren, useState } from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react';
import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from './theme';
import { useLocalStorage } from '@mantine/hooks';
import { authenticator } from './services/auth.server';
import Layout from './layouts/Layout';
import { type User } from '@prisma/client';
import { NothingFoundBackground } from './components/NothingFoundBackground/NothingFoundBackground';
import { ServerError } from './components/ServerError/ServerError';
import { ServerOverload } from './components/ServerOverload/ServerOverload';
import { CustomFonts } from './fonts/CustomFonts';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

export async function loader({ request }: LoaderArgs) {
    const user = (await authenticator.isAuthenticated(request)) || null;

    return json({
        userLoader: user,
    });
}
export function CatchBoundary() {
    const caught = useCatch();
    switch (caught.status) {
        case 404:
            return (
                <RootLayout>
                    <Layout>
                        <NothingFoundBackground />
                    </Layout>
                </RootLayout>
            );
        case 500:
            return (
                <RootLayout>
                    <Layout>
                        <ServerError />
                    </Layout>
                </RootLayout>
            );
        case 503:
            return (
                <RootLayout>
                    <Layout>
                        <ServerOverload />
                    </Layout>
                </RootLayout>
            );

        default:
            break;
    }
    return (
        <html>
            <head>
                <title>Oops!</title>
                <Meta />
                <Links />
            </head>
            <body>
                <h1>
                    {caught.status} {caught.statusText}
                </h1>
                <Scripts />
            </body>
        </html>
    );
}

export function RootLayout(props: PropsWithChildren) {
    const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
        key: 'color-scheme',
        defaultValue: 'dark',
    });

    const toggleColorScheme = (value?: ColorScheme) => {
        let current: ColorScheme = value || colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(current);
    };
    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme, ...theme }} withGlobalStyles withNormalizeCSS>
                <CustomFonts />
                <NotificationsProvider position="top-right" limit={3}>
                    <html lang="ru">
                        <head>
                            <StylesPlaceholder />
                            <Meta />
                            <Links />
                        </head>
                        <body>
                            {props.children}
                            <ScrollRestoration />
                            <Scripts />
                            <LiveReload />
                        </body>
                    </html>
                </NotificationsProvider>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}

export default function App() {
    const { userLoader } = useLoaderData();
    const [user, setUser] = useState<User | null>(userLoader);
    const [navBarLinksAddon, setNavBarLinksAddon] = useState([]);
    const [aside, setAside] = useState([]);

    return (
        <RootLayout>
            <Outlet context={{ user, setUser, navBarLinksAddon, setNavBarLinksAddon, aside, setAside }} />
        </RootLayout>
    );
}
