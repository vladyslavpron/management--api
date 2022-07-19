import { User, UserRoles } from '../user.entity';
export declare class CreateUserDto {
    readonly email: string;
    readonly role: UserRoles;
    readonly boss: User;
    readonly subordinates: number[];
    readonly password: string;
}
