import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.register(email,password);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body : any) {
        return this.authService.login(body.email, body.password);
    }
}
