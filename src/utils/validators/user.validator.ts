import {IsEmail, IsInt, IsNumber, IsNotEmpty, Length, IsString,IsEnum, IsArray } from 'class-validator';
import { userType } from '../enums/userTypes.enum';
import { AccountType } from '../enums/accountTypes.enum';
import { gender } from '../enums/gender.enum';
export class ValidateUserData {
    
    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    firstname: string;

 
    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    lastname: string;


    @IsEmail()
    @IsNotEmpty()
    email: string;

    
    @IsEnum(gender)
    @IsNotEmpty()
    gender: gender;

    @IsString()
    @IsNotEmpty()
    @Length(6,62)
    password: string;

    @IsEnum(userType)
    @IsNotEmpty()
    userType: userType;
}