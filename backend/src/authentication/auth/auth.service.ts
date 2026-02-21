import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/User';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly userService: UsersService,
  ) {}
  login(user: Pick<User, 'id' | 'email'>) {
    const payload = { sub: user.id, email: user.email };
    const options: SignOptions = {
      expiresIn: this.configService.get<number>('JWT_EXPIRES_IN')!,
      issuer: this.configService.get<string>('JWT_ISSUER')!,
      audience: this.configService.get<string>('JWT_AUDIENCE')!,
    };
    const token = jwt.sign(
      payload,
      this.configService.get<string>('JWT_SECRET')!,
      options,
    );
    return { ...user, accessToken: token };
  }

  async signup(signUpDto: SignUpDto) {
    // Avoids passing confirmPassword to the user service since it is only used for validation in the controller
    const { confirmPassword: _confimPassword, ...parsedSignUpDto } = signUpDto;
    const newUser = await this.userService.create(
      parsedSignUpDto as CreateUserDto,
    );
    return newUser;
  }
}
