import { AccountType } from './../utils/enums/accountTypes.enum';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
const { hashPassword} = require('../utils/hashes/password.hash');

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>,) {}

    async createUser(data:any, accType: AccountType){
        let {firstname,lastname,email, gender, password,accountType} = data;

        const userExist = await this.findUserByEmail(email);
        if(userExist.found && userExist.user.accountStatus==1){
            throw new NotAcceptableException('User already exist');
        }

        if(accType==AccountType.email){
            return this.createUserWithEmail(data);
        }
        else if(accType==AccountType.google){
            return this.createUserWithGoogle(data);
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
    async createUserWithEmail(data){
        let {firstname,lastname,email,gender,password,userType} = data;  
        const accountType = AccountType.email;
        password = await hashPassword(password); 
        const newUser = await this.userModel({email,firstname,})
    }
    
}
