import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.model';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        JwtModule.registerAsync({
            imports: [ConfigModule], // Missing this
            useFactory: async (configService: ConfigService) => ({
              signOptions: {
                 expiresIn: process.env.EXPIRES_IN,
              },
              secretOrPrivateKey: process.env.SECRET_KEY,
            }),
            inject: [ConfigService], 
          }),
      ],
      controllers: [],
      providers: [AuthService],
      exports: [AuthService]

})
export class AuthModule {}
