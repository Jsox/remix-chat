import { useEffect, useState } from 'react';
import { useHydrated } from 'remix-utils';

type ReturnParams = {
    fingerprint: string;
};

export function useFingerPrint(): ReturnParams {
    const hydrated = useHydrated();
    const [fingerprint, setFingerprint] = useState('');

    useEffect(() => {
        if (hydrated) {
            const setFp = async () => {
                const start = Date.now();
                const { ClientJS } = require('clientjs');
                const client = new ClientJS();
                const visitorId = client.getFingerprint();
                setFingerprint(visitorId);
                console.log('Got fingerprint for:', Date.now() - start + 'ms');
            };
            setFp();
        }
    }, [hydrated]);

    return { fingerprint };
}
