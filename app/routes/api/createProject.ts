import { PrismaClient } from '@prisma/client';
import { json, redirect, type ActionArgs } from '@remix-run/node';
import auth from 'app/services/auth.server';
import { filterAndTranslateTo } from '../../lib/filterAndTranslateTo';

export async function action({ request }: ActionArgs) {
    const user = await auth(request);
    if (!user.id) {
        return json({ error: 'Нужно авторизоваться' });
    }

    const form = await request.formData();
    const projectName = (await form.get('projectName')).trim() || '';

    let answer = '';

    const { error, errorMessage } = await filterAndTranslateTo(projectName, 'en');
    if (error) {
        return json({ error: errorMessage });
    }

    let prisma: PrismaClient = new PrismaClient();
    const slugify = require('slugify');

    let url = slugify(projectName, { lower: true, locale: 'ru' });
    let exists = await prisma.project.findFirst({
        where: {
            url,
        },
    });

    if (exists) {
        return redirect('/generate/project/' + exists.url);
    }

    const np = await prisma.project.create({
        data: {
            title: projectName,
            url,
            User: {
                connect: {
                    id: user.id,
                },
            },
        },
    });
    return redirect('/generate/project/' + np.url);
}
