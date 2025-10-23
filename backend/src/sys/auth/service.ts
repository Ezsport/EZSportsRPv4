import { 
  Injectable, 
  ConflictException, 
  UnauthorizedException,
  BadRequestException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto, RegisterDto, TokenResponseDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<TokenResponseDto> {
    const { email, password, firstName, lastName } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.sysUser.findUnique({ 
      where: { email } 
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.sysUser.create({
      data: {
        id: crypto.randomUUID(),
        email,
        password: hashedPassword,
        firstName,
        lastName,
        // role
        status: 'active'
      }
    });

    // Generate JWT token
    return this.generateTokenResponse(user);
  }

  async login(loginDto: LoginDto): Promise<TokenResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.sysUser.findUnique({ 
      where: { email } 
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    // await this.prisma.sysUser.update({
    //   where: { id: user.id },
    //   data: { lastLogin: new Date() }
    // });

    // Generate JWT token
    return this.generateTokenResponse(user);
  }

  // Token refresh method
  async refreshToken(currentToken: string): Promise<TokenResponseDto> {
    if (!currentToken) {
      throw new BadRequestException('Token is required');
    }

    try {
      // Decode the current token without verification
      const decoded = this.jwtService.decode(currentToken) as {
        sub: string;
        email: string;
        // role: string;
      };

      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }

      // Find the user
      const user = await this.prisma.sysUser.findUnique({
        where: { id: decoded.sub }
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate a new token
      return this.generateTokenResponse(user);
    } catch (error) {
      // If any error occurs during token refresh, throw unauthorized
      throw new UnauthorizedException('Unable to refresh token');
    }
  }

  private generateTokenResponse(user): TokenResponseDto {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      // role: user.role 
    };

    return {
      access_token: this.jwtService.sign(payload, {
        // Optional: You can set a different expiration for refresh tokens
        expiresIn: '7d'
      }),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        // role: user.role
      }
    };
  }
}
