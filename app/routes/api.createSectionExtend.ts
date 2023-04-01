import { json, type ActionArgs } from '@remix-run/node';
import { prismaClient } from 'app/lib/Prisma';

import auth from 'app/services/auth.server';
import { AiGenerator } from './../lib/AiGenerator/AiGenerator.server';

export async function loader() {
    throw new Response('нет такой страницы', {
        status: 404
    });
};

export const blogSectionExtendNeededFields = {
    sectionTitle: true,
    sectionMetaTitle: true,
    sectionHtmlDescription: true,
    sectionMetaDescription: true,
    sectionKeyWords: true,
}
export type sectionNeededFields = {
    sectionTitle: string;
    sectionMetaTitle: string;
    sectionHtmlDescription: string;
    sectionMetaDescription: string;
    sectionKeyWords: string;
} | null
export async function action({ request }: ActionArgs) {

    const user = await auth(request, true);
    if (!user?.id) {
        return json({ error: 'Нужно авторизоваться' });
    }

    const form = await request.formData();
    const sid = (await form.get('sid'))?.toString();
    const uniqueUserString = (await form.get('uniqueUserString'))?.toString();

    if (!sid) {
        return json({ error: 'Неверный запрос' });
    }

    const section = await prismaClient.section.findFirst({
        where: {
            id: parseInt(sid),
            userId: user.id
        },
        select: blogSectionExtendNeededFields
    })

    if (!section) {
        return json({ error: 'Неверный запрос' });
    }

    let isFullFilled = true;
    for (const key in section) {
        if (Object.prototype.hasOwnProperty.call(section, key)) {
            const text = section[key];
            if (text.trim().length === 0 || text.trim() == '<p></p>') {
                isFullFilled = false
                break;
            }
        }
    }

    if (isFullFilled) {
        return json({ error: 'Похоже, все поля раздела заполнены' });
    }

    const Generator = new AiGenerator({
        user,
        uniqueUserString
    })
    const result: any = await Generator.blogSectionExtend(section, sid)

    if (result?.error) {
        return json({ error: result?.error });
    }

    return json({
        result,
    });
}
