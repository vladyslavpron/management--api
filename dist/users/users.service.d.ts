import { BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    createUser(dto: CreateUserDto): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    getUserById(id: number): Promise<User>;
    getUsersById(ids: number[]): Promise<User[]>;
    getAllUsers(): Promise<User[]>;
    getBossWithRelations(boss: User): Promise<User[]>;
    changeBoss(boss: User, userId: number, newBossId: number): Promise<User | BadRequestException>;
}
