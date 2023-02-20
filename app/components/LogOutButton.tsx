import { Button } from '@mantine/core';
import { Form, useFetcher } from '@remix-run/react';
import { DataContext } from 'app/data/DataContext';
import { useContext } from 'react';

export default function LogOutButton() {
    const { setUser } = useContext(DataContext);
    const logOut = () => {
        setUser(null);

        fetcher.load('/auth/logout');
        // fetcher.submit({}, { method: 'post', action: '/auth/logout' });
    };

    const fetcher = useFetcher();

    return (
        <>
            {JSON.stringify(fetcher.data)}
            <Button onClick={logOut}>Выйти</Button>
        </>
    );
}
