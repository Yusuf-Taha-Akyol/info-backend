import { Controller, Post, Get, Body, HttpStatus, HttpCode, Req, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

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

    @Get('me')
    @UseGuards(JwtAuthGuard)
    getMe(@Req() req: any) {
        return req.user;
    }
}
