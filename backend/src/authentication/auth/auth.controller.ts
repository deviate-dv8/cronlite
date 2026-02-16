import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import type { RequestUser } from 'src/common/RequestUser';
import { LocalAuthGuard } from '../strategies/local/local.auth.guard';
import { SignUpDto } from './dto/sign-up.dto';
import { ApiTags } from '@nestjs/swagger';
// import { JwtAuthGuard } from '../strategies/jwt/jwt.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Body() loginDto: LoginDto, @Request() req: RequestUser) {
    return this.authService.login(req.user);
  }

  @Post('signup')
  signup(@Body() signupDto: SignUpDto) {
    // Signup logic to be implemented
    return { message: 'Signup endpoint is not yet implemented.' };
  }

  // @Post('logout')
  // @UseGuards(JwtAuthGuard)
  // logout(@Request() req: RequestUser) {
  //   // Logout logic to be implemented
  //   return { message: 'Logout endpoint is not yet implemented.' };
  // }
  //
  // @Post('reset-password')
  // resetPassword(@Body() resetPasswordDto: { email: string }) {
  //   // Reset password logic to be implemented
  //   return { message: 'Reset password endpoint is not yet implemented.' };
  // }
  // @Post('reset-password/:resetToken')
  // confirmResetPassword(
  //   @Body() confirmResetPasswordDto: { newPassword: string },
  // ) {
  //   // Confirm reset password logic to be implemented
  //   return {
  //     message: 'Confirm reset password endpoint is not yet implemented.',
  //   };
  // }
}
