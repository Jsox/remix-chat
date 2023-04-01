import {
    type User,
    type ChatMessage,
} from '@prisma/client';
import ISR from 'faster-query';

import prisma from 'prisma/client';
import { sendToTelegram } from './AiGenerator/errorHandler';

class Prisma {
    static async userGetOrCreateFromSocials(data: any): Promise<User> {
        let exists = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });

        if (exists?.id) {
            exists.password = '******';
            return exists;
        }

        const newUser = await prisma.user.create({
            data,
        });
        newUser.password = '******';
        sendToTelegram({ newUser })
        return newUser;
    }

    static async getUserMessages(
        uid: number | null
    ): Promise<ChatMessage[] | []> {
        if (!uid) return [];
        const messages = async () =>
            await prisma.chatMessage.findMany({
                where: {
                    user: {
                        id: uid,
                    },
                },
                include: {
                    user: true,
                },
                orderBy: {
                    created: 'asc',
                },
            });
        const mgs = new ISR(messages, {
            key: `${uid}-all-messages`,
            cacheTime: 5000,
            // isLogging: true,
        });
        return mgs.getData() || [];
    }

    static async getProjects(uid: number | null) {
        if (!uid) return []
        return await prismaClient.project.findMany({
            where: {
                User: {
                    id: uid,
                },
            },
            orderBy: {
                created: 'desc'
            },
            include: {
                Sections: true,
                Topics: true,
            },
        });
    }
}

export const prismaClient = prisma;
export const getProjects = Prisma.getProjects;
export const userGetOrCreateFromSocials = Prisma.userGetOrCreateFromSocials;
export const getUserMessages = Prisma.getUserMessages;

