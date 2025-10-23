import { 
  Controller, 
  Post, 
  Body, 
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Req
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './service';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto';
import { Request } from 'express';

@ApiTags('Authentication')
@Controller('sys/auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: TokenResponseDto })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(
    @Body(new ValidationPipe()) registerDto: RegisterDto
  ): Promise<TokenResponseDto> {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Login successful', type: TokenResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(
    @Body(new ValidationPipe()) loginDto: LoginDto
  ): Promise<TokenResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({ status: 200, description: 'Logout successful' })
  async logout(@Req() req: Request & { user: { sub: string } }) {
    // In a real-world scenario, you might want to:
    // 1. Invalidate the current token
    // 2. Add the token to a blacklist
    // 3. Perform any necessary cleanup

    // For now, we'll just return a success response
    return { 
      message: 'Logout successful',
      userId: req.user['sub'] // Optionally return user ID for logging
    };
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiResponse({ 
    status: 200, 
    description: 'Token refreshed successfully', 
    type: TokenResponseDto 
  })
  async refreshToken(@Body('token') currentToken: string) {
    // Validate and refresh the token
    return this.authService.refreshToken(currentToken);
  }
}
