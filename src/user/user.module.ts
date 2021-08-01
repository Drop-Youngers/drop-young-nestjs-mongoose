import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { verifyAccountSchema } from './verifyAccount.model';
@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema},{name: 'VerifyAccount', schema: verifyAccountSchema}]),
  ],
  controllers: [ UserController],
  providers: [UserService],
})
export class UserModule {}
