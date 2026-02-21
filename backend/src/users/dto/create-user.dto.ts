import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(
    {
      minLength: 8,
    },
    {
      message:
        'Password is too weak. It must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and symbols.',
    },
  )
  password: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => (value === 'true' ? true : false)) // Added this to support urlencoded
  isEmailVerified?: boolean | undefined;
}
