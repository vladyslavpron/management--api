import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  @Post('/login')
  async login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }
}
