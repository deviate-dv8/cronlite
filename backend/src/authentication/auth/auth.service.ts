import { Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/User';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private readonly configService: ConfigService) {}
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
    return '';
  }
}
