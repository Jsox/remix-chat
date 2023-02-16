import {
	createStyles,
	Menu,
	Center,
	Header,
	Container,
	Group,
	Button,
	Burger,
	Text,
	SegmentedControl,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons';
import { NavLink } from '@remix-run/react';
import { SwitchToggle } from '../SwitchToggle/SwitchToggle';
import { useColors } from '../../hooks/useColors';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
	header: {
		// background: header,
	},
	inner: {
		height: HEADER_HEIGHT,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	links: {
		[theme.fn.smallerThan('sm')]: {
			display: 'none',
		},
	},

	burger: {
		[theme.fn.largerThan('md')]: {
			display: 'none',
		},
	},

	link: {
		display: 'block',
		lineHeight: 1,
		padding: '8px 12px',
		borderRadius: theme.radius.sm,
		textDecoration: 'none',
		color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[0],
		fontSize: theme.fontSizes.sm,
		fontWeight: 500,

		'&:hover': {
			backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
		},
	},

	linkLabel: {
		marginRight: 5,
	},
}));

interface HeaderActionProps {
	links: { link: string; label: string; links: { link: string; label: string }[] }[];
	opened: boolean;
	toggle(): void;
}

export function HeaderAction({ links, opened, toggle }: HeaderActionProps) {
	const { classes } = useStyles();
	const { header } = useColors();
	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

		if (menuItems) {
			return (
				<Menu key={link.label} trigger='hover' exitTransitionDuration={0}>
					<Menu.Target>
						<NavLink to={link.link} className={classes.link} onClick={(event) => event.preventDefault()}>
							<Center>
								<span className={classes.linkLabel}>{link.label}</span>
								<IconChevronDown size={12} stroke={1.5} />
							</Center>
						</NavLink>
					</Menu.Target>
					<Menu.Dropdown>{menuItems}</Menu.Dropdown>
				</Menu>
			);
		}

		return (
			<NavLink
				key={link.label}
				to={link.link}
				className={classes.link}
				onClick={(event) => event.preventDefault()}>
				{link.label}
			</NavLink>
		);
	});

	return (
		<Header
			className={classes.header}
			height={HEADER_HEIGHT}
			sx={{ borderBottom: 0, backgroundColor: header }}
			mb={120}>
			<Container className={classes.inner} fluid>
				<Group>
					<Burger opened={opened} onClick={toggle} className={classes.burger} size='sm' />
					<Text size={28}>Logo</Text>
				</Group>
				<Group hidden={opened} spacing={5} className={classes.links}>
					{items}
				</Group>
				<Group spacing={4}>
					<Button radius='xs' sx={{ height: 30 }}>
						Get early access
					</Button>
					{/* <SegmentedToggle /> */}
					<SwitchToggle />
				</Group>
			</Container>
		</Header>
	);
}
