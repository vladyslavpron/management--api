"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async createUser(dto) {
        const user = this.usersRepository.create(Object.assign(Object.assign({}, dto), { subordinates: [] }));
        if (dto.subordinates && dto.subordinates.length) {
            if (dto.subordinates.includes(Number(dto.boss))) {
                throw new common_1.BadRequestException("same user can't be your boss and subordinate at same time");
            }
            if (dto.role !== user_entity_1.UserRoles.USER) {
                user.subordinates = await this.getUsersById(dto.subordinates);
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 5);
        user.password = hashedPassword;
        try {
            await this.usersRepository.save(user);
            return user;
        }
        catch (err) {
            if (err.code === '23505') {
                throw new common_1.HttpException('this email is already in use', common_1.HttpStatus.BAD_REQUEST);
            }
            else {
                throw new common_1.BadRequestException();
            }
        }
    }
    async getUserByEmail(email) {
        return this.usersRepository.findOne({
            where: {
                email,
            },
        });
    }
    async getUserById(id) {
        return this.usersRepository.findOne({
            where: {
                id,
            },
            relations: ['boss', 'subordinates'],
        });
    }
    async getUsersById(ids) {
        return this.usersRepository.find({ where: { id: (0, typeorm_2.In)(ids) } });
    }
    async getAllUsers() {
        return this.usersRepository.find({
            relations: ['boss', 'subordinates'],
        });
    }
    async getBossWithRelations(boss) {
        return this.usersRepository.find({
            where: {
                id: boss.id,
            },
            relations: [
                'boss',
                'subordinates',
                'subordinates.subordinates',
                'subordinates.subordinates.subordinates',
            ],
        });
    }
    async changeBoss(boss, userId, newBossId) {
        const user = await this.getUserById(userId);
        if (!user) {
            throw new common_1.BadRequestException('subordinate not found');
        }
        const newBoss = await this.getUserById(newBossId);
        if (user.boss.id === boss.id) {
            if (!newBoss) {
                return new common_1.BadRequestException("new boss can't be found");
            }
            user.boss = newBoss;
            if (newBoss.role === user_entity_1.UserRoles.USER) {
                newBoss.role = user_entity_1.UserRoles.BOSS;
                await this.usersRepository.save(newBoss);
            }
            await this.usersRepository.save(user);
            return user;
        }
        else {
            throw new common_1.HttpException('Only boss can change his subordinate boss to another', common_1.HttpStatus.FORBIDDEN);
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map