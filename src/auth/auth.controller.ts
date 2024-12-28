import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResponseLoginDto } from './dto/response-login.dto';

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post()
    login(@Body() data : LoginDto) : Promise<ResponseLoginDto> {
        return this.authService.login(data);
    }
}
