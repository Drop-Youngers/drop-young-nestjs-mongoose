import { AuthService } from './../auth/auth.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { verifyAccountSchema } from './verifyAccount.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configurations';

@Module({
  imports: [
      ConfigModule.forRoot({envFilePath: `src/config/${process.env.NODE_ENV}.env`, load: [configuration]}),
      MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'VerifyAccount', schema: verifyAccountSchema}]),
      JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
        // MailingModule
      
  ],
  controllers: [ UserController],
  providers: [UserService, AuthService,JwtService],
})
export class UserModule {}
