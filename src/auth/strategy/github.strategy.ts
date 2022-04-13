import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Strategy, VerifyCallback } from 'passport-github';

dotenv.config()

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
    constructor() {
        super({
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_SECRET,
            callbackURL: '/auth/github/callback',
            scope: ['email', 'profile'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
        const { displayName, email, photos } = profile;
        const user = {
            email,
            userName: displayName,
            picture: photos[0].value,
            accessToken
        }
        done(null, user);
    }
}