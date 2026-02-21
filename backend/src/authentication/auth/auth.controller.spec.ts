import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RequestUser } from '../../common/RequestUser';
import { mockDeep } from 'jest-mock-extended';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/sign-up.dto';

const mockAuthService = mockDeep<AuthService>();
describe('AuthController', () => {
  let controller: AuthController;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('login - should login a user', () => {
    const mockLoginDto: LoginDto = {
      email: 'user@example.com',
      password: 'password123',
    };
    const mockLoginResult = {
      id: 'abc',
      email: 'user@example.com',
      accessToken: 'access-token',
    };
    const request = {
      user: {
        id: 'abc',
        email: 'user@example.com',
        cronjobs: [],
        isEmailVerified: true,
      },
    } as unknown as RequestUser;
    mockAuthService.login.mockReturnValue(mockLoginResult);
    const result = controller.login(mockLoginDto, request);
    expect(mockAuthService.login).toHaveBeenCalledWith(request.user);
    expect(result).toBe(mockLoginResult);
  });

  // Logic checks is already done in the service, so we just need to check if the controller is calling the service with the correct parameters
  it('signup - should sign up a user', async () => {
    const mockSignUpDto: SignUpDto = {
      email: 'juandelacruz@example.com',
      password: 'Password123@',
      confirmPassword: 'Password123@',
    };
    const result = await controller.signup(mockSignUpDto);
    expect(mockAuthService.signup).toHaveBeenCalledWith(mockSignUpDto);
  });
});
