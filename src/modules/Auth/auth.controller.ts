import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterAuthDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginAuthDto) {
    return this.authService.login(body);
  }

  @Get(':id')
  single(@Param('id') id: string) {
    return this.authService.single(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(id);
  }
}
