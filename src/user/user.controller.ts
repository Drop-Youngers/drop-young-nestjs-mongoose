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
    constructor(private readonly userService:UserService){ }

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
    
    @Post('/createUserByGoogle')
    createUserByGoogle(
        @Body() data: any
        
    ){
        return this.userService.signUpWithGoogle(data);
    }
}
