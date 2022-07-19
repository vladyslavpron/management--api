import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    create(userDto: CreateUserDto): Promise<import("./user.entity").User>;
    getAll(req: any): Promise<import("./user.entity").User> | Promise<import("./user.entity").User[]>;
    changeBoss(userId: number, req: any, newBoss: {
        id: number;
    }): Promise<import("./user.entity").User | import("@nestjs/common").BadRequestException>;
}
