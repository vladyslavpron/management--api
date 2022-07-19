import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserDto {
  @IsString({ message: 'Email must be a string' })
  @IsEmail({}, { message: 'Invalid email' })
  readonly email: string;

  @IsString({ message: 'Password must be a string' })
  @Length(4, 20, {
    message: 'Password length must be in between 4 and 20 symbols',
  })
  readonly password: string;
}
