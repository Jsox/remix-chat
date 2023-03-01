import type { User } from '@prisma/client';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from './session.server';

import { GitHubStrategy } from 'remix-auth-github';
import { userGetOrCreate } from 'app/lib/Prisma';

import { GoogleStrategy } from 'remix-auth-google';
import { GoogleCredentialStrategy } from 'remix-auth-google-credential';

export let authenticator = new Authenticator<User>(sessionStorage);

let gitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.GH_CLIENT_ID || '',
        clientSecret: process.env.GH_CLIENT_SECRETS || '',
        callbackURL: 'http://localhost:3000/auth/github/callback',
    },
    async ({ accessToken, extraParams, profile }) => {
        return userGetOrCreate({
            email: profile.emails[0].value,
            name: profile.name.familyName || 'Not provided',
            fingerprint: profile?._json?.node_id || null,
            avatar: profile.photos[0]?.value || null,
        });
    }
);

let googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRETS || '',
        callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    async ({ accessToken, refreshToken, extraParams, profile }) => {
        console.log('!!!!!!!!!!!!!', { accessToken }, { extraParams }, { profile });
        return userGetOrCreate({
            email: profile.emails[0].value,
            name: profile.displayName || 'Not provided',
            fingerprint: profile.id,
            avatar: profile.photos[0],
        });
    }
);
const googleCredentialStrategy = new GoogleCredentialStrategy(
    {
        clientId: 'YOUR_CLIENT_ID',
        credentialId: 'fingerprint', // name of form field that stores credential. Default: credential
    },
    async (profile) => {
        return userGetOrCreate({
            email: profile.emails[0].value,
            name: profile.displayName || 'Not provided',
            fingerprint: profile.id,
            avatar: profile.photos[0],
        });
    }
);

authenticator.use(gitHubStrategy);
authenticator.use(googleStrategy);
authenticator.use(googleCredentialStrategy);

export default async function auth(request: Request): Promise<User | null> {
    let user = (await authenticator.isAuthenticated(request)) || null;
    return user;
}
