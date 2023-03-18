import {
    json,
    type LinksFunction,
    type LoaderArgs,
    type MetaFunction,
} from '@remix-run/node';
import { type PropsWithChildren, useState } from 'react';
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useLoaderData,
} from '@remix-run/react';
import type { ColorScheme } from '@mantine/core';
import {
    ColorSchemeProvider,
    createEmotionCache,
    MantineProvider,
} from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { Notifications } from '@mantine/notifications';
import { theme } from './theme';
import { useLocalStorage } from '@mantine/hooks';
import auth, { authenticator } from './services/auth.server';
import Layout from './layouts/Layout';
import { type User } from '@prisma/client';
import { NothingFoundBackground } from './components/NothingFoundBackground/NothingFoundBackground';
import { ServerError } from './components/ServerError/ServerError';
import { ServerOverload } from './components/ServerOverload/ServerOverload';
import { CustomFonts } from './fonts/CustomFonts';

import ProgressBar from './components/ProgressBar';
// import PWALinks from "./components/PWALinks";

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

export async function loader({ request, context }: LoaderArgs) {
    const { fingerprint: expressFingerprint } = context;

    const user = (await auth(request)) || null;

    let uniqueUserString: string = '';
    if (!user) {
        const uniqid = require('uniqid');
        uniqueUserString = uniqid();
    } else {
        const md5 = require('md5');
        uniqueUserString = md5(user);
    }

    return json({
        userLoader: user,
        expressFingerprint,
        uniqueUserString,
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
                <title>Упс!</title> <Meta />
                {/* <PWALinks /> */}
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
        let current: ColorScheme =
            value || colorScheme === 'dark' ? 'light' : 'dark';
        setColorScheme(current);
    };
    return (
        <ColorSchemeProvider
            colorScheme={colorScheme}
            toggleColorScheme={toggleColorScheme}
        >
            <MantineProvider
                theme={{ colorScheme, ...theme }}
                withGlobalStyles
                withNormalizeCSS
            >
                <ProgressBar />
                <CustomFonts />
                <html lang="ru">
                    <head>
                        <StylesPlaceholder />
                        <Meta />
                        <Links />
                    </head>
                    <body>
                        <Notifications position="top-right" limit={3} />
                        {props.children}
                        <ScrollRestoration />
                        <Scripts />
                        <LiveReload />
                    </body>
                </html>
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
// export const links: LinksFunction = () => {
//     return [{ rel: "manifest", href: "/resources/manifest.webmanifest" }];
// };
export type NavBarLinksAddon = { projects: []; sections: [] } | {}
export type Aside = [];

export interface IOutletContext {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    userTokens: number | null;
    setUserTokens: React.Dispatch<React.SetStateAction<number | null>>;
    navBarLinksAddon: NavBarLinksAddon;
    setNavBarLinksAddon: React.Dispatch<React.SetStateAction<NavBarLinksAddon>>;
    aside: Aside;
    setAside: React.Dispatch<React.SetStateAction<Aside>>;
}
export default function App() {
    const { userLoader, expressFingerprint, uniqueUserString } =
        useLoaderData();

    const [user, setUser] = useState<User | null>(userLoader);
    const [navBarLinksAddon, setNavBarLinksAddon] = useState<NavBarLinksAddon>(
        []
    );
    const [aside, setAside] = useState<Aside>([]);
    const [userTokens, setUserTokens] = useState(user ? user.tokens : 0);
    const [breadCrumbs, setBreadCrumbs] = useState([]);

    const context: IOutletContext = {
        user,
        setUser,
        userTokens,
        setUserTokens,
        navBarLinksAddon,
        setNavBarLinksAddon,
        aside,
        setAside,
        breadCrumbs,
        setBreadCrumbs,
        expressFingerprint,
        uniqueUserString,
    };
    return (
        <RootLayout>
            <Outlet context={{ ...context }} />
        </RootLayout>
    );
}
