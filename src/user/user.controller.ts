import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import {Controller,Get,Post, Body, UsePipes, ValidationPipe, HttpCode, Req, Param, UseGuards} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { userData } from '../utils/validators/user.validator';
import { AccountType } from 'src/utils/enums/accountTypes.enum';

@Controller('v1/api/users')
@ApiTags('users')
@ApiOkResponse(
    {}
)
export class UserController {
    constructor(private readonly userService:UserService,
        private readonly authService: AuthService){ }

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
    login(@Body() data: any){
        const {email, password} = data;
        return this.authService.emailLogin(email,password);
    }
}
