import { json, redirect, type ActionArgs } from '@remix-run/node';
import auth from 'app/services/auth.server';
import { AI21 } from '../lib/AI21';

export async function loader() {
    throw redirect('/', 404)
};

export async function action({ request }: ActionArgs) {
    const user = await auth(request);
    if (user && !user.id) {
        return json({ error: 'Нужно авторизоваться' });
    }

    const form = await request.formData();
    const prompt: string = (await form.get('prompt'))?.toString() || ''

    return json({ answer: await AI21.run(prompt) });
}
