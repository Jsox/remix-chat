import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { useFingerPrint } from './useFingerPrint';
import { type User } from '@prisma/client';

export default function useBrowserAuth() {
    const { fingerprint } = useFingerPrint();
    const getUser = useFetcher();

    const [user, setUser] = useState<User | {}>({});
    useEffect(() => {
        if (getUser.type === 'init' && fingerprint) {
            getUser.submit({ getUserData: fingerprint }, { method: 'post', action: '/api/createUser' });
        }
    }, [fingerprint]);

    if (getUser.data && !user.id) {
        setUser(getUser.data);
    }

    // user.id && console.log('useBrowserAuth', JSON.stringify(user, null, 2));

    return {
        user,
    };
}
