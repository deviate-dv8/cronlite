import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { Strategy } from 'passport-local';
import { User } from 'src/database/entities/User';
import { Repository } from 'typeorm';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {
    super({
      usernameField: 'email',
    });
  }
  async validate(
    email: string,
    password: string,
  ): Promise<Pick<User, 'id' | 'email'> | null> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: { id: true, email: true },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid Email or Password');
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Email or Password');
    }
    return user;
  }
}
