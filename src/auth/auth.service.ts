import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService:JwtService
    ){}


    async emailLogin()
}
