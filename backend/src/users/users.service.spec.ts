import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../database/entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseModule } from 'src/database/database.module';
import { AppConfigModule } from 'src/config/appConfig.module';

describe('UsersService', () => {
  let service: UsersService;
  // let users: jest.Mocked<Repository<User>>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
      imports: [DatabaseModule, AppConfigModule],
    }).compile();

    service = module.get<UsersService>(UsersService);
    // users = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create - should be defined', () => {
    expect(() => service.create).toBeDefined(); // Wrap in a function
  });
  it('create - should create a new user', async () => {
    const newUser: CreateUserDto = {
      email: 'john@example.com',
      password: 'Pass123!',
      isEmailVerified: undefined,
    };
    jest.spyOn(service, 'create').mockResolvedValue(newUser as User);
    const create = await service.create(newUser);
    expect(create).toEqual(newUser);
  });
});
