import {
    AuthService
} from './../auth/auth.service';
import {
    AccountType
} from './../utils/enums/accountTypes.enum';
import {
    Injectable,
    NotAcceptableException
} from '@nestjs/common';
import {
    InjectModel
} from '@nestjs/mongoose';
import {
    Model
} from 'mongoose';
import {
    User
} from './user.model';
const {
    hashPassword
} = require('../utils/hashes/password.hash');
import * as _ from 'lodash';
import {
    gender
} from 'src/utils/enums/gender.enum';

import { Enum } from 'nestjs-dotenv';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model < User > ,
        private readonly authService: AuthService ,

    ) {}

    async signUp(data: any, accType: AccountType) {
        let {
            firstname,
            lastname,
            email,
            gender,
            password,
            accountType
        } = data;

        const userExist = await this.findUserByEmail(email);
        if (userExist.found && userExist.user.accountStatus == 1) {
            throw new NotAcceptableException('User already exist');
        }

        if (accType == AccountType.email) {
            return this.signUpWithEmail(data);
        } else if (accType == AccountType.google) {
            // return this.signUpWithGoogle(data);
            return "dign up with google ok!"
        }
    }
    async findUserByEmail(email: string) {
        const user = await this.userModel.findOne({
            email: email
        });
        if (user)
            return {
                found: true,
                user
            }

        return {
            found: false
        }
    }
    async signUpWithEmail(data) {
        let {
            firstname,
            lastname,
            email,
            gender,
            password,
            userType
        } = data;
        const accountType = AccountType.email;
        password = await hashPassword(password);
        const newUser = await new this.userModel({
            firstname,
            lastname,
            email,
            gender,
            password,
            userType,
            accountType
        });

        const result = await newUser.save();
        return result;
    }

    async signUpWithGoogle(data) {
        let {
            firstname,
            lastname,
            email
        } = data;
        const accountStatus = 1;
        const accountType = AccountType.google;
        const newUser = await new this.userModel({
            firstname,
            lastname,
            email,
            gender,
            accountType,
            accountStatus
        });
        const result = await newUser.save();
        const userPayloads = _.pick(result, ['_id', 'firstname', 'lastname', 'email', 'gender', 'createdDate', 'accountType', 'userType', 'accountStatus']);

        const [payload, access_token] = await this.authService.generateAuthToken(userPayloads);
        return {
            success: true,
            message: 'User registered successfully',
            user: payload,
            access_token
        };
    }


    async getAllUsers() {
        return await this.userModel.find();
    }

    async findOneUser(id:string):Promise<User>{
        return await this.userModel.findOne({_id:id});
      }
    
      async updateUser(id:string, User:User): Promise<User>{
        return await this.userModel.findByIdAndUpdate(id,User, {new:true})
      }
    
      async deleteUser(id:string):Promise<User>{
        return await this.userModel.findByIdAndRemove(id);
      }
}