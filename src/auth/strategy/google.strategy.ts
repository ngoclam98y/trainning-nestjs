import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';


dotenv.config()


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor() {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            callbackURL: '/auth/google/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { displayName, emails, photos, id } = profile;

        const user = {
            email: emails[0].value,
            userName: displayName,
            picture: photos[0].value,
            googleId: id,
            accessToken
        }
        done(null, user);
    }
}