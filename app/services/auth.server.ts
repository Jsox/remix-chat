import type { User } from '@prisma/client';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';

import { GitHubStrategy } from 'remix-auth-github';

import { GoogleStrategy } from 'remix-auth-google';
import { TelegramStrategy } from './TelegramStrategy';

import prisma from 'prisma/client';

export let authenticator = new Authenticator<User>(sessionStorage);

let select = {
    id: true,
    email: true,
    phone: true,
    name: true,
    avatar: true,
    // tokens: true,
    // didPay: true,
    isAdmin: true,
}

// let telegramStrategy = new TelegramStrategy(
//     {
        
//     },
//     (came) => {
//         console.log("🚀 ~ file: auth.server.ts:30 ~ came:", came)
//         // let lastEmail = profile?.emails?.length - 1
//         // let pretender = {
//         //     email: profile?.emails?.[0]?.value,
//         //     name: profile.displayName || '[не указано]',
//         //     avatar: profile.photos[0]?.value || null,
//         // }
//         // console.log("🚀 ~ file: auth.server.ts:42 ~ pretender:", pretender)
//         // return prisma.user.upsert({
//         //     create: pretender,
//         //     update: pretender,
//         //     where: {
//         //         email: profile.emails[0].value,
//         //     },
//         //     select
//         // })
//         return { came }
//     }
// );
let gitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GH_CLIENT_ID || '',
        clientSecret: process.env.GH_CLIENT_SECRETS || '',
        callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    ({ accessToken, extraParams, profile }) => {
        // let lastEmail = profile?.emails?.length - 1
        let pretender = {
            email: profile?.emails?.[0]?.value,
            name: profile.displayName || '[не указано]',
            avatar: profile.photos[0]?.value || null,
        }
        console.log("🚀 ~ file: auth.server.ts:42 ~ pretender:", pretender)
        return prisma.user.upsert({
            create: pretender,
            update: pretender,
            where: {
                email: profile.emails[0].value,
            },
            select
        })
    }
);

let googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRETS || '',
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    ({ accessToken, refreshToken, extraParams, profile }) => {
        let pretender = {
            email: profile.emails[0].value,
            name: profile.displayName || '[не указано]',
            avatar: profile.photos[0].value || null,
        }
        console.log("🚀 ~ file: auth.server.ts:42 ~ pretender:", pretender)
        return prisma.user.upsert({
            create: pretender,
            update: pretender,
            where: {
                email: profile.emails[0].value,
            },
            select
        })
    }
);


authenticator.use(gitHubStrategy);
authenticator.use(googleStrategy);
// authenticator.use(telegramStrategy);

export default async function auth(request: Request, fromDB = false): Promise<User | null> {
    let user = (await authenticator.isAuthenticated(request)) || null;

    if (user?.id && fromDB) {
        user = await prisma.user.findFirst({
            where: {
                id: user.id,
            }
        })
    }
    // console.log("🚀 ~ file: auth.server.ts:66 ~ auth ~ user:", user, { fromDB })
    return user;
}

