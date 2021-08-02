import {IsEmail, IsInt, IsNumber, IsNotEmpty, Length, IsString,IsEnum, IsArray } from 'class-validator';
import { userType } from '../enums/userTypes.enum';
import { AccountType } from '../enums/accountTypes.enum';
import { gender } from '../enums/gender.enum';
import { ApiProperty } from '@nestjs/swagger';
export class userData {
    
    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    @ApiProperty()
    firstname: string;

 
    @IsString()
    @IsNotEmpty()
    @Length(2,50)
    @ApiProperty()
    lastname: string;


    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    
    @IsEnum(gender)
    @IsNotEmpty()
    @ApiProperty()
    gender: gender;

    @IsString()
    @IsNotEmpty()
    @Length(6,62)
    @ApiProperty()
    password: string;

    @IsEnum(userType)
    @IsNotEmpty()
    @ApiProperty()
    userType: userType;
}