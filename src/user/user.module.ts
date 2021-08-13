import { AuthService } from './../auth/auth.service';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { verifyAccountSchema } from './verifyAccount.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import configurations from '../config/configurations';

@Module({
  imports: [
      MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'VerifyAccount', schema: verifyAccountSchema}]),
      JwtModule.register({
          secret: process.env.SECRET_KEY,
        }),
        // MailingModule
        AuthModule,
      
  ],
  controllers: [ UserController],
  providers: [UserService, AuthService,JwtService],
})
export class UserModule {}
