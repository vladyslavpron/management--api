export declare enum UserRoles {
    ADMIN = "Administrator",
    BOSS = "Boss",
    USER = "Regular user"
}
export declare class User {
    id: number;
    role: UserRoles;
    email: string;
    subordinates: User[];
    boss: User;
    password: string;
}
