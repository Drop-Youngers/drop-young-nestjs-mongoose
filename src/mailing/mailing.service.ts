import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MailerService} from '@nestjs-modules/mailer';
import { VerifyAccount } from 'src/user/verifyAccount.model';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import { AuthService } from 'src/auth/auth.service';
const {generateRandomCode} = require('../utils/randoms/email-verification-code');

@Injectable()
export class MailingService {
    constructor(
        private readonly mailerService: MailerService,
        @InjectModel('VerifyAccount') private readonly VerifyAccountModel: Model<VerifyAccount>,
        @InjectModel('User') private readonly UserModel: Model<User>,
        private readonly authService: AuthService
        ){}



        public async sendEmailVerification(userId:string,firstname: string, email: string) {
            const verificationCode = await this.signVerificationCode(userId);
    
            if(!verificationCode)
            throw new InternalServerErrorException('Verfication code not sent');
    
            this
              .mailerService
              .sendMail({
                to: email,
                from: process.env.EMAIL_USER, 
                subject: 'Gerand Verification email',
                template: 'emailVerification.index.hbs', 
                context: { 
                  code: verificationCode.code,
                  firstname: firstname,
                },
              })
              .then((success) => {
                console.log(success)
              })
              .catch((err) => {
                console.log(err)
              });
          }
          private async signVerificationCode(userId: string){
           const verificationCode = await generateRandomCode();
           const account = await this.VerifyAccountModel.findOne({_id: userId});

           if(account){
             const newData = {
               userId: account.userId,
               verificationCode: verificationCode,
               isVerified: false
             }
             await account.findOneAndUpdate({_id: userId},newData);
             return {
              success: true,
              code: verificationCode
            }
           }
           const newVerificaton = await new this.VerifyAccountModel({userId,verificationCode});
           await newVerificaton.save();
           return {
             success: true,
             code: verificationCode
           }
      }
}
