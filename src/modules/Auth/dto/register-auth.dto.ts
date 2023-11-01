import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 4,
  })
  password: string;

  @IsString()
  username?: string;
}
