import { json, redirect, type ActionArgs } from '@remix-run/node';
import { Generator } from 'app/lib/ai-blog.server';
import clearTextForJson from 'app/lib/clearTextForJson';
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
    if (!query) {
        return json({ error: 'Неверный запрос' });
    }


    const generator = new Generator(query, 2);

    const result = await generator.generateBlogSections();

    if (result?.error) {
        return json({ error: result?.error });
    }

    let text = result?.choices[0].text.trim();
    text = clearTextForJson(text);
    console.log({ text });

    const dJSON = require('dirty-json');
    const jsonArr = dJSON.parse(text);
    console.log({ ServerJsonArr: jsonArr });

    return json({
        jsonArr,
        text,
        usage: result?.usage,
    });
}
