import { PrismaClient, type User, type ChatMessages, type MessageAuthor } from '@prisma/client';
import ISR from 'faster-query';

const prisma = new PrismaClient();

class Prisma {
    async userGetOrCreate(data: User) {
        let where = {};
        if (data.phone) {
            where = {
                phone: data.phone,
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
        const userExists = new ISR(exists, {
            key: data.phone || data.fingerprint,
            cacheTime: 500,
        });
        exists = await userExists.getData();

        console.log({ exists });

        if (exists) {
            exists.password = '******';
            return exists;
        }

        const newUser = await prisma.user.create({
            data,
        });
        console.log({ newUser });
        newUser.password = '******';
        return newUser;
    }
}

export const p = new Prisma();
export const userGetOrCreate = p.userGetOrCreate;
