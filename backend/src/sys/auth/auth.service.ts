import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async me(user: any) {
    if (!user || !user.id || !user.email) throw new UnauthorizedException('Invalid credentials');
    const dbUser = await this.prisma.sysUser.findUnique({
      where: { id: user.id },
    });
    if (!dbUser) throw new UnauthorizedException('Invalid credentials');
    return dbUser;
  }

  async register(email: string, password: string, name?: string) {
    const hash = await bcrypt.hash(password, 10);

    return this.prisma.sysUser.create({
      data: {
        email,
        name,
        password: hash,
      }
    });
  }

  async validateUser(email: string, password: string) {

    const user = await this.prisma.sysUser.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };

    await this.validateUser(payload.email, user.password);

    return { access_token: this.jwt.sign(payload) };
  }

  async validateOAuthLogin(profile: any) {
    const { emails, displayName, photos } = profile;

    // Check if user exists
    let user = await this.prisma.sysUser.findUnique({
      where: { email: emails[0].value },
    });

    // If not, create user
    if (!user) {
      user = await this.prisma.sysUser.create({
        data: {
          email: emails[0].value,
          password: await bcrypt.hash(emails[0].value, 10),
          // name: displayName,
          // avatar: photos[0]?.value,
        },
      });
    }
    return user;
  }
}
