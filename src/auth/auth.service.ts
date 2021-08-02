import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import * as argon from 'argon2';
import * as _ from 'lodash';
const { verifyPassword} = require('../utils/hashes/password.hash');

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService:JwtService
    ){}


    async emailLogin(email:string, password){
        const user = await this.userModel.findOne({ email: email });
        if(!user && user.accountStatus==0){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await verifyPassword(user.password,password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }

        const [payload, access_token] = await this.signToken(user);

        return {
            success : true,
            user : payload,
            access_token : access_token
        }
    }

    public async signToken(user){
        try{
         const payload = await _.pick(user,['_id','firstname','lastname','email','gender','createdDate','accountType','userType','accountStatus'] ) 
         const access_token = await this.jwtService.sign(payload);
         return [payload, access_token]
        }
       catch(e){
           throw new InternalServerErrorException(e);
       }
    } 
}
