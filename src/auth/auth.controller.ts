import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Res() res, @Body() signInDto: Record<string, any>) {
    try {
      const token = await this.authService.signIn(
        signInDto.email,
        signInDto.password,
      );
      return res.status(HttpStatus.OK).send({
        data: token,
      });
    } catch (error) {
      console.error('Sign-in error:', error);
      return res.status(HttpStatus.UNAUTHORIZED).send({
        message: 'Invalid credentials',
      });
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @Post('signup')
  async signUp(@Body() signUpDto: Record<string, any>) {
    return this.authService.signUp(
      signUpDto.email,
      signUpDto.password,
      signUpDto.name,
      signUpDto.birth,
    );
  }
}
