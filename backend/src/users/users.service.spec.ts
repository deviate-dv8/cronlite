import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from '../database/entities/User';
import { CreateUserDto } from './dto/create-user.dto';
import { DatabaseModule } from 'src/database/database.module';
import { AppConfigModule } from 'src/config/appConfig.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { mockDeep } from 'jest-mock-extended';

jest.mock('argon2', () => {
  return {
    hash: jest.fn().mockResolvedValue('hashedPassword'),
  };
});

// Mock data for testing
const newUser: CreateUserDto = {
  email: 'john@example.com',
  password: 'Pass123!',
  isEmailVerified: undefined,
};
const existingUser: Pick<User, 'email' | 'password' | 'isEmailVerified'> = {
  email: 'existing@email.com',
  password: 'hashedPassword',
  isEmailVerified: false,
};
const mockUsersDB: User[] = [
  {
    email: 'john@example.com',
    id: '1',
    password: 'hashedpassword',
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    cronjobs: [],
  },
];

const mockUsers = mockDeep<Repository<User>>();
describe('UsersService', () => {
  let service: UsersService;
  let users: jest.Mocked<Repository<User>>;
  let mockArgon2: jest.Mocked<typeof argon2>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsers,
        },
      ],
      imports: [],
    }).compile();

    service = module.get<UsersService>(UsersService);
    users = module.get(getRepositoryToken(User));
    mockArgon2 = argon2 as jest.Mocked<typeof argon2>;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('create - should create a new user', async () => {
    const savedUser = {
      id: '1',
      email: 'john@example.com',
      password: 'hashedPassword',
      isEmailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const { password: _, ...res } = savedUser as User;
    // Mock Users repository methods

    // Test for unique email
    mockUsers.findOneBy.mockResolvedValue(null);

    mockArgon2.hash.mockResolvedValue('hashedPassword');
    mockUsers.create.mockReturnValue(savedUser as User);
    mockUsers.save.mockResolvedValue(savedUser as User);
    const result = await service.create(newUser);
    expect(result).toEqual(res);

    // Verify Users repository methods
    expect(users.findOneBy).toHaveBeenCalledWith({ email: newUser.email });
  });
  it('create - should throw an error if email already exists', async () => {
    mockUsers.findOneBy.mockResolvedValue(existingUser as User);
    await expect(service.create(newUser)).rejects.toThrow(ConflictException);
  });
  it('findAll - should return an array of users', async () => {
    jest.spyOn(users, 'find').mockResolvedValue(mockUsersDB);
    mockUsers.find.mockResolvedValue(mockUsersDB);
    const result = await service.findAll();
    expect(result).toEqual(mockUsersDB);
  });
  it('findOne - should return a user by id', async () => {
    const user = mockUsersDB[0];
    mockUsers.findOneBy.mockResolvedValue(user);
    const result = await service.findOne('1');
    expect(result).toEqual(user);
  });
  it('findOne - should return null if user not found', async () => {
    mockUsers.findOneBy.mockResolvedValue(null);
    await expect(
      service.findOne('b819b068-ccd2-4c59-a44f-b15517ca0b4e'),
    ).rejects.toThrow(NotFoundException);
  });
});
