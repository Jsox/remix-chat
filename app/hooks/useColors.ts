import { useMantineColorScheme, useMantineTheme } from '@mantine/core';

export function useColors() {
	const theme = useMantineTheme();
	const { colorScheme } = useMantineColorScheme();

	const primaryTextColor = colorScheme === 'dark' ? theme.colors.gray[0] : theme.colors.gray[0];
	const primaryBackgroundColor = colorScheme === 'dark' ? theme.colors.primary[9] : theme.colors.primary[5];

	const darkBlueBackgroundColor = colorScheme === 'dark' ? theme.colors.darkBlue[5] : theme.colors.darkBlue[1];
	const darkBlueBackgroundColorNegative = colorScheme === 'dark' ? theme.colors.primary[9] : theme.colors.primary[6];

	const textColor = colorScheme === 'dark' ? theme.colors.gray[1] : theme.colors.gray[9];
	const bodyBackgroundColor = colorScheme === 'dark' ? theme.colors.darkBlue[7] : theme.colors.gray[0];

	const header = colorScheme === 'dark' ? theme.colors.darkBlue[8] : theme.colors.darkBlue[2];
	return {
		primaryTextColor,
		header,
		textColor,
		primaryBackgroundColor,
		primaryStyles: {
			color: primaryTextColor,
			backgroundColor: primaryBackgroundColor,
		},
		bodyStyles: {
			color: textColor,
			backgroundColor: bodyBackgroundColor,
		},
		commentStyles: {
			color: primaryTextColor,
			backgroundColor: darkBlueBackgroundColor,
			borderColor: colorScheme === 'dark' ? theme.colors.darkBlue[3] : theme.colors.darkBlue[2],
		},
		commentStylesNegative: {
			color: primaryTextColor,
			backgroundColor: darkBlueBackgroundColorNegative,
			borderColor: colorScheme === 'dark' ? theme.colors.primary[8] : theme.colors.primary[5],
		},
	};
}
