import { type ActionArgs, json } from '@remix-run/node';
import { userGetOrCreate } from 'app/lib/Prisma';

export async function action({ request }: ActionArgs) {
    const fingerprint = (await request.formData()).get('getUserData')?.toString();
    if (!fingerprint) return json({ error: 'нет fp', ok: false });
    try {
        const user = await userGetOrCreate({ fingerprint });
        return json(user);
    } catch (error: {}) {
        return json({ error: error.message, ok: false });
    }
}
