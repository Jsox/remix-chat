import { redirect, type LoaderArgs } from '@remix-run/node';
import { authenticator } from 'app/services/auth.server';

export let loader = ({ request, params }: LoaderArgs) => {
    const { provider } = params;

    if (!provider) {
        throw redirect(process.env.REDIRECT_FAIL || '/');
    }

    return authenticator.authenticate(provider, request, {
        successRedirect: process.env.REDIRECT_AFTER_LOGIN || '/',
        failureRedirect: process.env.REDIRECT_FAIL || '/',
    });
};
