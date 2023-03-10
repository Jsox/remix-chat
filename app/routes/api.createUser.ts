import { type ActionArgs, json, redirect } from '@remix-run/node';
import { userGetOrCreate } from 'app/lib/Prisma';

export async function loader() {
    throw json(null, 404);
};

export async function action({ request }: ActionArgs) {
    const fingerprint: string = (await request.formData()).get('getUserData')?.toString() || '';
    if (!fingerprint) return json({ error: 'нет fp', ok: false });
    try {
        const user = await userGetOrCreate({ fingerprint });
        return json(user);
    } catch (error: any) {
        return json({ error: error.message, ok: false });
    }
}
