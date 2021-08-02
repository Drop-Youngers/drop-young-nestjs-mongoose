import { AccountType } from './../utils/enums/accountTypes.enum';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
const { hashPassword} = require('../utils/hashes/password.hash');
import * as _ from 'lodash';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>,) {}

    async signUp(data:any, accType: AccountType){
        let {firstname,lastname,email, gender, password,accountType} = data;

        const userExist = await this.findUserByEmail(email);
        if(userExist.found && userExist.user.accountStatus==1){
            throw new NotAcceptableException('User already exist');
        }

        if(accType==AccountType.email){
            return this.signUpWithEmail(data);
        }
        else if(accType==AccountType.google){
            // return this.signUpWithGoogle(data);
            return "dign up with google ok!"
        }
    }
    async findUserByEmail(email: string){
        const user = await this.userModel.findOne({email: email});
        if(user)
        return {
            found: true,
            user
        }

        return{
            found: false
        }
    }
    async signUpWithEmail(data){
        let {firstname,lastname,email,gender,password,userType} = data;  
        const accountType = AccountType.email;
        password = await hashPassword(password); 
        const newUser = await new this.userModel({firstname,lastname,email,gender,password,userType,accountType});

        const result = await newUser.save();
        return result;
    }

    // async signUpWithGoogle(data){
    //     let {firstname,lastname,email} = data;  
    //     const accountStatus = 1;
    //     const accountType = AccountType.google;
    //     const newUser = await new this.userModel({firstname,lastname,email, gender, accountType,accountStatus});
    //     const result = await newUser.save();  
    //     const userPayloads = _.pick(result,['_id','firstname','lastname','email','gender','createdDate','accountType','userType','accountStatus']);

    //     const [payload,access_token] = await this.authService.signToken(userPayloads);
    //     return {
    //         success: true,
    //         message: 'User registered successfully',
    //         user: payload,
    //         access_token
    //     }; 
    // }
    
}
