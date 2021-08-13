// import { MailingService } from './../mailing/mailing.service';
import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import {Controller,Get,Post, Body, UsePipes, ValidationPipe, HttpCode, Req, Param, UseGuards, Put, Delete} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { userData } from '../utils/validators/user.validator';
import { AccountType } from 'src/utils/enums/accountTypes.enum';
import { loginData } from 'src/utils/validators/login.validator';
import { User } from './user.model';

@Controller('v1/api/users')
@ApiTags('users')
@ApiOkResponse(
    {}
)
export class UserController {
    constructor(private readonly userService:UserService,
        private readonly authService: AuthService,
        // private readonly mailingService:MailingService
        ){ }

    @Post('/createUserByEmail')
        @UsePipes(new ValidationPipe({transform: true}))
        createUserByEmail(
            @Body() data: userData
        ){  
            return this.userService.signUp(data, AccountType.email);
        }

    @Get('/getAllUsers')
    getAllUsers(){
        return this.userService.getAllUsers();
    }   
    
    // @Post('/createUserByGoogle')
    // createUserByGoogle(
    //     @Body() data: any
        
    // ){
    //     return this.userService.signUpWithGoogle(data);
    // }


    @Post('/auth/email/login')
    @HttpCode(200)
    login(@Body() data: loginData){
        const {email, password} = data;
        return this.authService.emailLogin(email,password);
    }


    // @Get('/auth/verifyEmail/userId/:userId/code/:code')
    // verifyEmail(@Param('userId') userId: string, @Param('code') code: number){
    //    return this.mailingService.verifyEmail(userId, code);
    // }


    @Get('/getUserById/:id')
    async findOne(@Param('id') id:string):Promise<User>{
        return this.userService.findOneUser(id)
    }

    @Get('/getUserByEmail/:email')
    async findOneByEmail(@Param('email') email:string){
        return this.userService.findUserByEmail(email);
    }
  
    @Put('/updateUser/:id')
    async update( @Param('id') id:string, @Body() createUserDTO: User):Promise<User>{
      return this.userService.updateUser(id, createUserDTO);
    }
  
    @Delete('/deleteUser/:id')
    async delete(@Param('id') id:string):Promise<User>{
        return this.userService.deleteUser(id);
    }

}
