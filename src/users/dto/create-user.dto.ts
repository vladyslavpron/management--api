import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
} from 'class-validator';
import { User, UserRoles } from '../user.entity';

export class CreateUserDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsOptional()
  @IsEnum(UserRoles, {
    message: `role must be one of: ${Object.values(UserRoles).join(', ')}`,
  })
  readonly role: UserRoles;

  @ValidateIf((user) => user.role !== UserRoles.ADMIN)
  @IsNotEmpty({ message: 'any user must have a boss' })
  readonly boss: User;

  @ValidateIf((user) => user.role === UserRoles.BOSS)
  @IsArray({ message: 'subordinates must be array' })
  @ArrayNotEmpty({ message: 'Boss must have at least 1 subordinate' })
  readonly subordinates: number[];

  @IsString({ message: 'Password must be a string' })
  @Length(4, 20, {
    message: 'Password length must be in between 4 and 20 symbols',
  })
  readonly password: string;
}
