import type { Section, User } from "@prisma/client";
import { type ActionArgs, json, type JsonFunction } from "@remix-run/node";
import { errorHandler, type ErrorAnswer } from "app/lib/AiGenerator/errorHandler";
import { Censure } from "app/lib/Censure";
import { prismaClient } from "app/lib/Prisma";
import auth from "app/services/auth.server";

export async function loader() {
    throw new Response('Нет такой страницы', { status: 404 });
};

export async function action({ request, params }: ActionArgs) {
    try {
        const user = await auth(request, true)

        let answer: any = null

        const { mutation, model, id } = params

        const form = await request.formData();
        const action = await form.get('action');
        const value = await form.get('value') || '';

        if (!action) {
            throw new Response('Нет такой страницы', { status: 500 });
        }

        if (!user || !id || !model || !mutation) {
            throw new Response('Нет такой страницы', { status: 404 });
        }

        const updateSection = async () => {

            const formDataObj = {};
            form.forEach((value, key) => {
                if (Censure.isBad(value)) {
                    Censure.replace(value)
                    errorHandler({
                        message: 'Неприличные слова сохранять не будем 😐',
                        from: 'updateSection',
                        data: { data: Censure.replace(value), key }
                    })
                }
                formDataObj[key] = value
            });

            delete formDataObj.action
            delete formDataObj.isFullFilled

            let exists = await prismaClient.section.findFirst({
                where: {
                    id: parseInt(id),
                    userId: user.id
                },
            })
            if (!exists) {
                throw new Error('hack attempt')
            }

            const updated = await prismaClient.section.update({
                where: {
                    id: parseInt(id),
                },
                data: {
                    ...formDataObj
                }
            })
            return updated
        }

        if (model === 'section') {
            if (action === 'updateSection') {
                return json({ answer: (await updateSection()) })
            } else {
                const SM = new SectionMutator(id, `${action}`, user, `${value}`);
                answer = await SM.action()
            }

        }

        return json({ answer })

    } catch (error: any) {
        return errorHandler({
            message: error.message,
            returnJson: true,
            data: error
        })
    }


}

class SectionMutator {
    constructor(public id: number | string, public actionName: string, public user: User, public value: string = '') {

    }

    async action(form = null): Promise<JsonFunction | ErrorAnswer> {
        try {
            let answer: any = null;

            switch (this.actionName) {
                case 'setActive':

                    const exists = await prismaClient.section.findFirst({
                        where: {
                            id: parseInt(this.id),
                            userId: this.user.id
                        }
                    })
                    if (!exists) {
                        throw new Error('hack attempt failed');
                    }

                    answer = await prismaClient.section.update({
                        where: {
                            id: parseInt(this.id),
                        },
                        data: {
                            active: this.value === 'true' ? true : false
                        }
                    })

                    break;

                default:
                    answer = { error: '500' }
                    break;
            }
            return answer
        } catch (error: any) {
            return errorHandler({
                message: 'Ошибка. Попробуйте позже',
                returnJson: true,
                data: form,
                from: 'api.$mutation.$model.$id'
            })
        }


    }
}