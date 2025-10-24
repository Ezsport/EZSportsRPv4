import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  async logout(@Req() req: any) {
    return this.authService.logout(req.userId);
  }

  // Google OAuth routes
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
    // Passport will attach user payload to req.user
    const payload = req.user as any;
    // You can redirect with tokens or respond JSON.
    // Example: redirect to frontend with tokens in query (for demo only; production: use secure cookie + state)
    const redirectUrl = `http://localhost:3000/oauth-success?access_token=${payload.access_token}&refresh_token=${payload.refresh_token}`;
    res.redirect(redirectUrl);
  }
}
