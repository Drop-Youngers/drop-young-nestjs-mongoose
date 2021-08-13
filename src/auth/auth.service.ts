import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';
import * as argon from 'argon2';
import * as _ from 'lodash';
const jwt = require( 'jsonwebtoken' );
import dotenv from 'dotenv'


const { verifyPassword} = require('../utils/hashes/password.hash');

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService:JwtService
    ){}


    async emailLogin(email:string, password){
        const user = await this.userModel.findOne({ email: email });
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await verifyPassword(user.password,password);
        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials');
        }
        const access_token = await this.generateAuthToken(user);

        return {
            success : true,
            payload : user,
            access_token : access_token
        }
    }


    async generateAuthToken (user) {
        return jwt.sign({user}, process.env.SECRET_KEY )
    }

}
