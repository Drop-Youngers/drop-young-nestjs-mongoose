import { UserService } from './user.service';
import {Controller,Get,Post, Body, UsePipes, ValidationPipe, HttpCode, Req, Param, UseGuards} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {ValidateUserData} from '../utils/validators/user.validator';
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
            @Body() data: ValidateUserData
        ){  
            return this.userService.signUp(data, AccountType.email);
        }
}
