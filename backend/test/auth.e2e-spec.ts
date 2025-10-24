import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { CaslAbilityFactory } from '../src/sys/auth/casl-ability.factory';
import { UserRole } from '../src/sys/auth/roles.guard';

describe('Authentication and Authorization System (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
  let caslAbilityFactory: CaslAbilityFactory;
  let adminToken: string;
  let playerToken: string;
  let coachToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    
    prismaService = app.get(PrismaService);
    caslAbilityFactory = app.get(CaslAbilityFactory);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Authentication Tests
  describe('User Registration and Login', () => {
    it('should register a new admin user', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/sys/auth/register')
        .send({
          email: 'admin@example.com',
          password: 'AdminPassword123!',
          role: UserRole.ADMIN
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty('access_token');
      adminToken = registerResponse.body.access_token;
    });

    it('should register a new player user', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/sys/auth/register')
        .send({
          email: 'player@example.com',
          password: 'PlayerPassword123!',
          role: UserRole.PLAYER
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty('access_token');
      playerToken = registerResponse.body.access_token;
    });

    it('should register a new coach user', async () => {
      const registerResponse = await request(app.getHttpServer())
        .post('/sys/auth/register')
        .send({
          email: 'coach@example.com',
          password: 'CoachPassword123!',
          role: UserRole.COACH
        })
        .expect(201);

      expect(registerResponse.body).toHaveProperty('access_token');
      coachToken = registerResponse.body.access_token;
    });

    it('should login with existing credentials', async () => {
      const loginResponse = await request(app.getHttpServer())
        .post('/sys/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'AdminPassword123!'
        })
        .expect(201);

      expect(loginResponse.body).toHaveProperty('access_token');
    });

    it('should reject registration with invalid email', async () => {
      await request(app.getHttpServer())
        .post('/sys/auth/register')
        .send({
          email: 'invalid-email',
          password: 'Password123!'
        })
        .expect(400);
    });
  });

  // Authorization Tests
  describe('CASL Authorization Checks', () => {
    it('should create ability for admin user', async () => {
      const ability = await caslAbilityFactory.createForUser({
        id: 'test-admin-id',
        role: UserRole.ADMIN
      });

      expect(ability.can('manage', 'all')).toBeTruthy();
      expect(ability.can('create', 'Team')).toBeTruthy();
      expect(ability.can('read', 'User')).toBeTruthy();
    });

    it('should create ability for player user', async () => {
      const ability = await caslAbilityFactory.createForUser({
        id: 'test-player-id',
        role: UserRole.PLAYER
      });

      expect(ability.can('read', 'User')).toBeTruthy();
      expect(ability.cannot('create', 'Team')).toBeTruthy();
    });

    it('should create ability for coach user', async () => {
      const ability = await caslAbilityFactory.createForUser({
        id: 'test-coach-id',
        role: UserRole.COACH
      });

      expect(ability.can('read', 'Team')).toBeTruthy();
      expect(ability.can('read', 'Player')).toBeTruthy();
      expect(ability.cannot('create', 'Team')).toBeTruthy();
    });
  });

  // Permission Database Checks
  describe('Permission Database Integrity', () => {
    it('should have permissions for all roles', async () => {
      const roles = Object.values(UserRole);
      
      for (const role of roles) {
        const rolePermissions = await prismaService.rolePermission.findMany({
          where: { roleType: role },
          include: { permission: true }
        });

        expect(rolePermissions.length).toBeGreaterThan(0);
      }
    });

    it('should have unique permissions', async () => {
      const permissions = await prismaService.sysPermission.findMany();
      const uniquePermissions = new Set(permissions.map(p => p.name));
      
      expect(permissions.length).toBe(uniquePermissions.size);
    });
  });

  // Security Vulnerability Checks
  describe('Security Checks', () => {
    it('should prevent brute force login attempts', async () => {
      // Simulate multiple failed login attempts
      for (let i = 0; i < 10; i++) {
        await request(app.getHttpServer())
          .post('/sys/auth/login')
          .send({
            email: 'admin@example.com',
            password: 'WrongPassword'
          });
      }

      // Last attempt should be rate-limited
      await request(app.getHttpServer())
        .post('/sys/auth/login')
        .send({
          email: 'admin@example.com',
          password: 'WrongPassword'
        })
        .expect(429); // Too Many Requests
    });

    it('should validate password complexity', async () => {
      await request(app.getHttpServer())
        .post('/sys/auth/register')
        .send({
          email: 'weak@example.com',
          password: 'weak'  // Too short
        })
        .expect(400);
    });
  });
});
