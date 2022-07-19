import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(userDto: CreateUserDto): Promise<{
        user: import("../users/user.entity").User;
        token: string;
    }>;
    login(userDto: LoginUserDto): Promise<{
        user: import("../users/user.entity").User;
        token: string;
    }>;
}
