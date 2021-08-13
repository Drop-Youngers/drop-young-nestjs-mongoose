import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {JwtModule } from '@nestjs/jwt';
import { UserSchema } from './../user/user.model';
import {verifyAccountSchema} from '../user/verifyAccount.model';

@Module({
    imports: [
        MongooseModule.forFeature([
          {name: 'User', schema: UserSchema},
          {name: 'VerifyAccount', schema: verifyAccountSchema},

      ]),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
     ],
     exports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema},
        {name: 'VerifyAccount', schema: verifyAccountSchema},
    ]),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
     ]
})
export class SharedModule {}
