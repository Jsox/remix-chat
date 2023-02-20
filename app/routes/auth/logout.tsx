import { authenticator } from 'app/services/auth.server';

export async function loader({ request }) {
    await authenticator.logout(request, { redirectTo: '/' });
}
