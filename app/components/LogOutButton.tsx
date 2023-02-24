import { Button, type ButtonProps } from '@mantine/core';
import { Form, useFetcher } from '@remix-run/react';
import { IconLogout } from '@tabler/icons';
import { DataContext } from 'app/data/DataContext';
import { useContext } from 'react';

export default function LogOutButton(props: ButtonProps) {
    const { setUser } = useContext(DataContext);
    const logOut = () => {
        setUser(null);
        fetcher.load('/auth/logout');
    };

    const fetcher = useFetcher();

    return (
        <Button
            radius={'xl'}
            onClick={logOut}
            {...props}
            leftIcon={<IconLogout size={16} />}
            sx={(theme) => ({
                transition: 'all .2s ease-in-out',
                backgroundColor: theme.colors.darkBlue[theme.colorScheme === 'dark' ? 4 : 3],
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.colors.darkBlue[theme.colorScheme === 'dark' ? 7 : 4],
                },
            })}
        >
            Выйти
        </Button>
    );
}
