import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.usersService.createUser(userDto);
    const token = this.generateToken(user);
    return { user, token };
  }

  async login(candidate: LoginUserDto) {
    const user = await this.usersService.getUserByEmail(candidate.email);

    if (!user) {
      throw new BadRequestException("can't find user with this email");
    }

    const passwordsMatch = await bcrypt.compare(
      candidate.password,
      user.password,
    );

    if (!passwordsMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const token = this.generateToken(user);

    delete user.password;

    return { user, token };
  }

  generateToken(user: User) {
    const payload = { id: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
