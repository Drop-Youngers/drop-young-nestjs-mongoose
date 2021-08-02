import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: process.env.CALLBACK_URL,
            scope: ['email','profile']
        })
    }

    async validate(accessToken: string, refleshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        const {name, emails, gender, photos} = profile;

        const user = {
            firstname: name.givenName,
            lastname: name.familyName,
            email: emails[0].value,
            gender: gender,
            profile: photos[0].value,
            accessToken,
            refleshToken
        }
        done(null, user);
    }
}
