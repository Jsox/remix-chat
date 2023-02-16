import { Grid, Skeleton, Paper, Flex } from '@mantine/core';

export default function ChatMessageSkeleton({ position }) {
	return (
		<Flex
			sx={(theme) => {
				backgroundColor: theme.colors.darkBlue[5];
			}}
			direction={'row'}
			style={{
				width: '100%',
			}}>
			<Flex
				w={'100%'}
				direction={position == 'left' ? 'row' : 'row-reverse'}
				sx={(theme) => ({
					[theme.fn.largerThan('sm')]: {
						width: '80%',
						marginBottom: `${theme.spacing.md}px`,
						padding: `${theme.spacing.lg}px ${theme.spacing.xl}px`,
					},
				})}>
				<Paper p={20} bg='transparent'>
					<Skeleton height={50} width={50} circle mb='xl' />
				</Paper>
				<Flex
					justify={position == 'left' ? 'start' : 'end'}
					p={20}
					w={'100%'}
					direction={'column'}
					align={'start'}
					gap={10}>
					<Skeleton height={15} width='50px' radius='xl' />
					<Skeleton height={10} mt={6} width='150px' radius='xl' />
					<Skeleton height={8} mt={6} width='100%' radius='xl' />
					<Skeleton height={8} mt={6} width='100%' radius='xl' />
					<Skeleton height={8} mt={6} width='100%' radius='xl' />
				</Flex>
			</Flex>
		</Flex>
	);
}
