import type { Section, User } from "@prisma/client";
import { type ActionArgs, json } from "@remix-run/node";
import { prismaClient } from "app/lib/Prisma";
import auth from "app/services/auth.server";

export async function loader() {
    throw json(null, 404);
};

export async function action({ request, params }: ActionArgs) {
    const user = await auth(request)

    let answer: any = null

    const { mutation, model, id } = params

    const form = await request.formData();
    const action = await form.get('action');

    if (!user || !id || !model || !mutation) {
        return json(null, 404);
    }

    if (!action) {
        return json({ error: 'invalid action' }, 500);
    }


    if (model === 'section') {
        const SM = new SectionMutator(id, `${action}`, user);
        answer = await SM.action()
    }


    return json({ answer })

}

class SectionMutator {
    constructor(public id: number | string, public actionName: string, public user: User) {

    }

    async action(): Promise<Section | Section[] | { error: string }> {
        try {
            let answer: any = null;

            switch (this.actionName) {
                case 'setActiveFalse':

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
                            active: false
                        }
                    })

                    break;

                default:
                    answer = { error: '500' }
                    break;
            }
            return answer
        } catch (error: any) {
            console.log('SectionMutator ERROR',error);
            
            return { error: error?.message }
        }


    }
}