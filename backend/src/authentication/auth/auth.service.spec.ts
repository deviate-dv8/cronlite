import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../strategies/local/local.strategy';
import { JwtStrategy } from '../strategies/jwt/jwt.strategy';
import { DatabaseModule } from 'src/database/database.module';
import { AppConfigModule } from 'src/config/appConfig.module';
import { Repository } from 'typeorm';
import { User } from 'src/database/entities/User';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';

const newUser: Pick<User, 'email' | 'password'> & {
  confirmPassword: string;
} = {
  email: 'rizal@example.com',
  password: 'Rizzal123!',
  confirmPassword: 'Rizzal123!',
};
describe('AuthService', () => {
  let service: AuthService;
  let users: jest.Mocked<Repository<User>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy],
      imports: [DatabaseModule, AppConfigModule],
      exports: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
    users = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TODO: Add test on emailer after it is implemented
  it('signup - should register a new user', async () => {
    // Mock the users repository methods

    const savedUser: User = {
      ...newUser,
      id: '2',
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      cronjobs: [],
    };

    jest.spyOn(users, 'findOneBy').mockResolvedValue(null);
    jest.spyOn(users, 'create').mockReturnValue({
      ...newUser,
      id: '2',
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      cronjobs: [],
    } as User);
    jest.spyOn(users, 'save').mockResolvedValue(savedUser);
    const result = await service.signup(newUser as SignUpDto);

    expect(result).toEqual(savedUser);

    // Verfifies function call params
    expect(users.findOneBy).toHaveBeenCalledWith({ email: newUser.email }); // eslint-disable-line
  });
});
