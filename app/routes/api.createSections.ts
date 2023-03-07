import { json, type ActionArgs } from '@remix-run/node';
import { generateBlogSections } from 'app/lib/AiGenerator/generateBlogSections.server';

import auth from 'app/services/auth.server';

export async function loader() {
    throw json(null, 404);
};

export async function action({ request }: ActionArgs) {

    const user = await auth(request);
    if (!user?.id) {
        return json({ error: 'Нужно авторизоваться' });
    }

    const form = await request.formData();
    const query = (await form.get('query'))?.toString();
    const pid = (await form.get('pid'));

    if (!query) {
        return json({ error: 'Неверный запрос' });
    }



    const result = await generateBlogSections(user.id, parseInt(pid), { blogTheme: query })

    if (result?.error) {
        return json({ error: result?.error });
    }

    return json({
        result,
    });
}
