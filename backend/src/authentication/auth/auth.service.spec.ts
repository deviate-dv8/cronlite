import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from 'src/database/entities/User';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignUpDto } from './dto/sign-up.dto';
import { UsersService } from 'src/users/users.service';
import { mockDeep } from 'jest-mock-extended';
import { ConfigService } from '@nestjs/config';
import jwt, { SignOptions } from 'jsonwebtoken';
const newUser: Pick<User, 'email' | 'password'> & {
  confirmPassword: string;
} = {
  email: 'rizal@example.com',
  password: 'Rizzal123!',
  confirmPassword: 'Rizzal123!',
};
const usersServiceMock = mockDeep<UsersService>();
const ConfigServiceMock = mockDeep<ConfigService>();

// Libs
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mocked-jwt-token'),
}));

describe('AuthService', () => {
  let service: AuthService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ConfigService, useValue: ConfigServiceMock },
        {
          provide: getRepositoryToken(User),
          useValue: { findOneBy: jest.fn(), save: jest.fn() },
        },
      ],
      exports: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('login - should return a JWT token', () => {
    const userPaylod = { id: '1', email: 'joserizal@philippines.com' };
    // Mock the jwt.sign function to return a fixed token
    const result = service.login(userPaylod);
    const options: SignOptions = {
      expiresIn: ConfigServiceMock.get('JWT_EXPIRES_IN'),
      issuer: ConfigServiceMock.get('JWT_ISSUER'),
      audience: ConfigServiceMock.get('JWT_AUDIENCE'),
    };
    expect(jwt.sign).toHaveBeenCalledWith(
      { sub: userPaylod.id, email: userPaylod.email },
      ConfigServiceMock.get('JWT_SECRET'),
      options,
    );
    expect(result).toEqual({
      ...userPaylod,
      accessToken: 'mocked-jwt-token',
    });
  });

  // Simply test that it calls the function from userService
  it('signup - should register a new user', async () => {
    const signUpDto = newUser as SignUpDto;
    await service.signup(signUpDto);

    // checks the first argument of the first call to the create function of the user service
    const args = usersServiceMock.create.mock.calls[0][0];
    expect(args.email).toBe(signUpDto.email);
    expect(args.password).toBe(signUpDto.password);
  });
});
