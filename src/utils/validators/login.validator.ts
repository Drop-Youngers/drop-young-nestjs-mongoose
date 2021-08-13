import {IsEmail, IsInt, IsNumber, IsNotEmpty, Length, IsString,IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class loginData {


    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;


    @IsString()
    @IsNotEmpty()
    @Length(6,62)
    @ApiProperty()
    password: string;
}