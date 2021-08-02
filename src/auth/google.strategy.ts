import { Injectable } from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {Strategy, VerifyCallback} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(){
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '', 
            scope: ['email','profile']
        })
    }

    async validate(accessToken: string, refleshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        const {name, emails, photos} = profile;

        const user = {
            firstname: name.givenName,
            lastname: name.familyName,
            email: emails[0].value,
            gender: name.gender,
            profile_pic: photos[0].value,
            accessToken,
            refleshToken
        }
        done(null, user);
    }
}
