import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }


  @ApiOperation({ summary: 'Get current user' })
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @Get('me')
  async me(@Req() req: any) {
    return this.authService.me(req.user);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto.email, dto.password);
  }

  @ApiOperation({ summary: 'Login a user' })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Logout a user' })
  @ApiBearerAuth('JWT-auth')
  @ApiHeader({ name: 'Authorization', description: 'Bearer token' })
  @Post('logout')
  async logout(@Req() req: any) {
    // return this.authService.logout(req.userId);
  }

  // Google OAuth routes
  @ApiOperation({ summary: 'Google OAuth' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // initiates the Google OAuth2 login flow
  }

  // @Get('google/redirect')
  // @UseGuards(AuthGuard('google'))
  // async googleAuthRedirect(@Req() req: any, @Res() res: Response) {
  //   // Passport will attach user payload to req.user
  //   const payload = req.user as any;
  //   // You can redirect with tokens or respond JSON.
  //   // Example: redirect to frontend with tokens in query (for demo only; production: use secure cookie + state)
  //   const redirectUrl = `http://localhost:3000/oauth-success?access_token=${payload.access_token}&refresh_token=${payload.refresh_token}`;
  //   res.redirect(redirectUrl);
  // }
}
