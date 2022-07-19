import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRoles } from './user.entity';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Req() req) {
    if (req.user.role === UserRoles.ADMIN) {
      return this.usersService.getAllUsers();
    } else if (req.user.role === UserRoles.BOSS) {
      return this.usersService.getBossWithRelations(req.user);
    } else if (req.user.role === UserRoles.USER) {
      return this.usersService.getUserById(req.user.id);
    }
  }

  @Patch('/:userId')
  @UseGuards(AuthGuard)
  async changeBoss(
    @Param('userId') userId: number,
    @Req() req,
    @Body() newBoss: { id: number },
  ) {
    return this.usersService.changeBoss(req.user, userId, newBoss.id);
  }
}
