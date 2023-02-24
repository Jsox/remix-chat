import { json, type LoaderArgs, MetaFunction } from '@remix-run/node';
import { createContext, useContext, useEffect, useState } from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration, useCatch, useLoaderData } from '@remix-run/react';
import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from './theme';
import { useLocalStorage } from '@mantine/hooks';
import { authenticator } from './services/auth.server';
import { DataContext } from './data/DataContext';
import { ChatMessage, User } from '@prisma/client';
import { getUserMessages } from './lib/Prisma';
import { RemixSseProvider } from 'remix-sse/client';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

export async function loader({ request, context }: LoaderArgs) {
    const user = (await authenticator.isAuthenticated(request)) || null;
    const messages = user ? await getUserMessages(user.id) : [];

    return json({
        userLoader: user,
        messages,
    });
}
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
export default function App() {
    const { userLoader, messages } = useLoaderData();
    const [user, setUser] = useState<User | null>(userLoader);
    const [chatMessages, setChatMessages] = useState<ChatMessage[] | []>(messages);

    useEffect(() => {
        if (!user) {
            setChatMessages([]);
        }
    }, [user]);

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
                <NotificationsProvider position="top-right" limit={3}>
                    <html lang="ru">
                        <head>
                            <StylesPlaceholder />
                            <Meta />
                            <Links />
                        </head>
                        <body>
                            <DataContext.Provider value={{ user, setUser, chatMessages, setChatMessages }}>
                                <RemixSseProvider>
                                    <Outlet />
                                </RemixSseProvider>
                            </DataContext.Provider>
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
