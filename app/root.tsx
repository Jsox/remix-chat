import type { MetaFunction } from '@remix-run/node';
import { useState } from 'react';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, createEmotionCache, MantineProvider } from '@mantine/core';
import { StylesPlaceholder } from '@mantine/remix';
import { NotificationsProvider } from '@mantine/notifications';
import { theme } from './theme';
import { useLocalStorage } from '@mantine/hooks';

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	viewport: 'width=device-width,initial-scale=1',
});

createEmotionCache({ key: 'mantine' });

export default function App() {
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
				<NotificationsProvider limit={3}>
					<html lang='ru'>
						<head>
							<StylesPlaceholder />
							<Meta />
							<Links />
						</head>
						<body>
							<Outlet />
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
