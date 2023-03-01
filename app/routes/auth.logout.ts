import { type LoaderArgs, redirect, type ActionArgs } from '@remix-run/node';
import { authenticator } from 'app/services/auth.server';

// export async function action({ request }: ActionArgs) {
//     console.log('!!!!!!!!!!!!!!! out');

//     await authenticator.logout(request, { redirectTo: process.env.REDIRECT_AFTER_LOGOUT || '/' });
//     return redirect(process.env.REDIRECT_AFTER_LOGOUT || '/');
// }
export async function loader({ request }: LoaderArgs) {
    console.log('!!!!!!!!!!!!!!! out');

    await authenticator.logout(request, { redirectTo: process.env.REDIRECT_AFTER_LOGOUT || '/' });
    return redirect(process.env.REDIRECT_AFTER_LOGOUT || '/');
}
