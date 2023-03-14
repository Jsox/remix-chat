import {
    PrismaClient,
    type User,
    type ChatMessage,
    type MessageAuthor,
} from '@prisma/client';
import ISR from 'faster-query';
import auth from 'app/services/auth.server';

let prisma: PrismaClient;

if (!global.prisma) {
    global.prisma = new PrismaClient();
}
prisma = global.prisma;

class Prisma {
    static async userGetOrCreate(data: User): Promise<User> {
        const start = Date.now();
        let where = {};
        if (data.phone) {
            where = {
                phone: data.phone,
            };
        } else if (data.email) {
            where = {
                email: data.email,
            };
        } else {
            where = {
                fingerprint: data.fingerprint,
            };
        }
        let exists = async () =>
            await prisma.user.findUnique({
                where,
            });
        let key = data.phone || data.fingerprint || data.email;
        const userExists = new ISR(exists, {
            key,
            cacheTime: 1000,
        });
        exists = await userExists.getData();

        console.log({ exists });

        if (exists) {
            exists.password = '******';
            console.log(
                'Got from cache userGetOrCreate for:',
                Date.now() - start + 'ms'
            );
            return exists;
        }

        const newUser = await prisma.user.create({
            data,
        });
        console.log({ newUser });
        newUser.password = '******';
        console.log('CREATED userGetOrCreate for:', Date.now() - start + 'ms');
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
export const userGetOrCreate = Prisma.userGetOrCreate;
export const getUserMessages = Prisma.getUserMessages;
