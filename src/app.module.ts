import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MailingService } from './mailing/mailing.service';
import { MailingModule } from './mailing/mailing.module';
import { SharedModule } from './shared/shared.module';
@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot('mongodb://localhost/notepen-db',{
      useFindAndModify: false
    }),
    AuthModule,
    MailingModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [AppService, MailingService],
})
export class AppModule {}
