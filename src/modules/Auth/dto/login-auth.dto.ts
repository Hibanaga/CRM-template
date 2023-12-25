import { IsEmail, IsEmpty, IsString, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;

  @IsEmpty()
  username: string;
}
