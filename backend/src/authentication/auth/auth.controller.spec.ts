import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from '../strategies/local/local.strategy';
import { JwtStrategy } from '../strategies/jwt/jwt.strategy';
import { RequestUser } from '../../common/RequestUser';
import { DatabaseModule } from 'src/database/database.module';
import { AppConfigModule } from 'src/config/appConfig.module';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      imports: [DatabaseModule, AppConfigModule],
      exports: [],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should login a user', () => {
    const mockLoginDto = { email: 'user@example.com', password: 'password123' };
    const mockLoginResult = {
      id: 'abc',
      email: 'user@example.com',
      accessToken: 'access-token',
    };
    const request: RequestUser = {
      id: 'abc',
      email: 'user@example.com',
    } as unknown as RequestUser;
    jest.spyOn(service, 'login').mockReturnValue(mockLoginResult);
    const result = controller.login(mockLoginDto, request);
    expect(result).toBe(mockLoginResult);
  });
});
