import { ApiProperty } from '@nestjs/swagger';
import { Equals, IsEmail, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @MinLength(8)
  @ApiProperty()
  password: string;

  @Equals('password', { message: 'Passwords do not match' })
  @ApiProperty()
  confirmPassword: string;
}
