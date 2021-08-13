import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {JwtModule } from '@nestjs/jwt';
import { UserSchema } from './user.model';

@Module({
    imports: [
        MongooseModule.forFeature([
          {name: 'User', schema: UserSchema},
      ]),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
     ],
     exports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
     ]
})
export class SharedModule {}
