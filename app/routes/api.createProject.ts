import { PrismaClient } from '@prisma/client';
import { json, redirect, type ActionArgs } from '@remix-run/node';
import auth from 'app/services/auth.server';
import { filterAndTranslateTo } from '../lib/filterAndTranslateTo';

export async function loader() {
    throw redirect('/', 404)
};

export async function action({ request }: ActionArgs) {
    const user = await auth(request);
    if (!user?.id) {
        return json({ error: 'Нужно авторизоваться, что-бы начать работу с генерацией текстов!' });
    }

    const form = await request.formData();
    const projectName = (await form.get('projectName'))?.toString().trim() || '';

    if (projectName.length < 6) {
        return json({ error: 'Неверный текст запроса' });
    }

    const { error, errorMessage } = await filterAndTranslateTo(projectName, 'en');
    if (error) {
        return json({ error: errorMessage });
    }

    let prisma: PrismaClient = new PrismaClient();
    const slugify = require('slugify');

    let url: string = slugify(projectName, { lower: true, locale: 'ru' });
    if (!url) {
        return json({ error: 'Ошибка' }, 500);
    }

    let exists = await prisma.project.findFirst({
        where: {
            url,
            User: {
                id: user.id,
            },
        },
    });

    if (exists) {
        return redirect('/generate/project/' + exists.url);
    }

    const newPr = {
        title: projectName,
        url,
        User: {
            connect: {
                id: user.id,
            },
        },
    };
    const pr = await prisma.project.create({
        data: newPr,
    });

    return redirect('/generate/project/' + pr.url);
}
