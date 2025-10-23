import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
       
    });
 
  }

  async onModuleInit() {
    
  }

  async onModuleDestroy() {
   
  }

  // Optional: Add a method to test database connection explicitly
  async testConnection() {
  
  }
}
