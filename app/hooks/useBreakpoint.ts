import { useMediaQuery } from '@mantine/hooks';
import { useMantineTheme } from '@mantine/styles';

export default function useBreakpoints() {
	const theme = useMantineTheme();
	const isXs = useMediaQuery(`(max-width: ${theme.breakpoints.xs}px)`);
	const isXl = useMediaQuery(`(min-width: ${theme.breakpoints.xl}px)`);
    const largerXs = useMediaQuery(`(min-width: ${theme.breakpoints.xs}px)`);
    const largerSm = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);
    const smallerSm = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
    const smallerLg = useMediaQuery(`(max-width: ${theme.breakpoints.lg}px)`);
    const largerMd = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);

    return {
        isXs,
        isXl,
        largerXs,
        largerSm,
        largerMd,
        smallerSm,
        smallerLg,
    };
}
