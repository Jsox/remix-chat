import { json, type ActionArgs } from '@remix-run/node';
import { generateBlogSections } from 'app/lib/AiGenerator/generateBlogSections.server';
import { prismaClient } from 'app/lib/Prisma';

import auth from 'app/services/auth.server';
import { AiGenerator } from './../lib/AiGenerator/AiGenerator.server';

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
    const uniqueUserString = (await form.get('uniqueUserString'))?.toString();
    let pid: FormDataEntryValue | null | number = (await form.get('pid'));

    pid = parseInt(pid) || null;

    if (!query || !pid) {
        return json({ error: 'Неверный запрос' });
    }
    
    const project = await prismaClient.project.findFirst({
        where: {
            id: pid,
            userId: user.id
        },
        include: {
            Sections: true
        }
    })

    if (!project) {
        return json({ error: 'Неверный запрос' });
    }

    const Generator = new AiGenerator({
        job: 'blogSections',
        user,
        project,
        uniqueUserString
    })

    

    const result = await Generator.blogSections()

    if (result?.error) {
        return json({ error: result?.error });
    }

    return json({
        result,
    });
}
