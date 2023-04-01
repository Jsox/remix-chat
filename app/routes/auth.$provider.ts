import { type ActionArgs, redirect } from '@remix-run/node';

import { authenticator } from 'app/services/auth.server';

export let loader = () => {
    throw redirect(process.env.REDIRECT_FAIL || '/');
};

export let action = ({ request, params, context }: ActionArgs) => {
    const { provider } = params;

    switch (provider) {
        case 'telegram':
            
            break;

    }

    if (!provider) {
        throw redirect(process.env.REDIRECT_FAIL || '/');
    }
    return authenticator.authenticate(provider, request, context);
};
