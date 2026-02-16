import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/database/entities/User';
import jwt, { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from './dto/sign-up.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User) private readonly users: Repository<User>,
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
    const userExist = await this.users.findOneBy({ email: signUpDto.email });
    if (userExist) {
      throw new ConflictException('User with this email already exists');
    }
    // TODO: mailers later
    const newUser = this.users.create({
      ...signUpDto,
    });
    return newUser;
  }
}
