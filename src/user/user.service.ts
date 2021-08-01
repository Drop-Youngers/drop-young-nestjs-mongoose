import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>,) {}

    async createUser(data:any, accType: AccountType){

    }
}
