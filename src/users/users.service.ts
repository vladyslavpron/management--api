import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRoles } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = this.usersRepository.create({ ...dto, subordinates: [] });

    if (dto.subordinates && dto.subordinates.length) {
      if (dto.subordinates.includes(Number(dto.boss))) {
        throw new BadRequestException(
          "same user can't be your boss and subordinate at same time",
        );
      }

      if (dto.role !== UserRoles.USER) {
        user.subordinates = await this.getUsersById(dto.subordinates);
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 5);
    user.password = hashedPassword;

    try {
      await this.usersRepository.save(user);

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new HttpException(
          'this email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new BadRequestException();
      }
    }
  }

  async getUserByEmail(email: string) {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async getUserById(id: number) {
    return this.usersRepository.findOne({
      where: {
        id,
      },
      relations: ['boss', 'subordinates'],
    });
  }

  async getUsersById(ids: number[]) {
    return this.usersRepository.find({ where: { id: In(ids) } });
  }

  async getAllUsers() {
    return this.usersRepository.find({
      relations: ['boss', 'subordinates'],
    });
  }

  async getBossWithRelations(boss: User) {
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

  async changeBoss(boss: User, userId: number, newBossId: number) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new BadRequestException('subordinate not found');
    }

    const newBoss = await this.getUserById(newBossId);

    if (user.boss.id === boss.id) {
      if (!newBoss) {
        return new BadRequestException("new boss can't be found");
      }
      user.boss = newBoss;
      if (newBoss.role === UserRoles.USER) {
        newBoss.role = UserRoles.BOSS;
        await this.usersRepository.save(newBoss);
      }
      await this.usersRepository.save(user);
      return user;
    } else {
      throw new HttpException(
        'Only boss can change his subordinate boss to another',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
