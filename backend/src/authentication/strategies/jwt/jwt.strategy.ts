import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppJwtPayload } from 'src/common/jwtPayload';
import { User } from 'src/database/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET') as string,
      issuer: configService.get('JWT_ISSUER') as string,
      audience: configService.get('JWT_AUDIENCE') as string,
    });
  }
  async validate(payload: AppJwtPayload) {
    const user = await this.usersRepository.findOne({
      where: { id: payload.sub },
      select: ['id', 'email', 'createdAt', 'updatedAt'],
      //TODO: Implement email verification check
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
