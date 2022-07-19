import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    register(userDto: CreateUserDto): Promise<{
        user: User;
        token: string;
    }>;
    login(candidate: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
    generateToken(user: User): string;
}
