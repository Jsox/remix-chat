import { Button, type ButtonProps } from '@mantine/core';
import { NavLink, useOutletContext } from '@remix-run/react';
import { IconLogout } from '@tabler/icons';

export default function LogOutButton(props: ButtonProps) {
    const { setUser }: any = useOutletContext();
    // const fetcher = useFetcher();
    const logOut = async () => {
        // await fetcher.submit({ do: 'logout' }, { method: 'post', action: '/auth/logout' });
        setUser(null);
    };

    return (
        <Button
            component={NavLink}
            to={'/auth/logout'}
            radius={'lg'}
            onClick={logOut}
            {...props}
            leftIcon={<IconLogout size={16} />}
            sx={(theme) => ({
                transition: 'all .2s ease-in-out',
                backgroundColor: theme.colors.darkBlue[theme.colorScheme === 'dark' ? 4 : 1],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.darkBlue[theme.colorScheme === 'dark' ? 5 : 2],
                },
            })}
        >
            Выйти
        </Button>
    );
}
