import { type LoaderArgs, redirect } from '@remix-run/node';
import { authenticator } from 'app/services/auth.server';

export async function loader({ request }: LoaderArgs) {
    await authenticator.logout(request, { redirectTo: process.env.REDIRECT_AFTER_LOGOUT || '/' });
    return redirect(process.env.REDIRECT_AFTER_LOGOUT || '/');
}
