import { Module } from '@nestjs/common';
import { BaseCompetitionsService } from './service';
import { BaseCompetitionsAdminController } from './ctrl.admin';
import { BaseCompetitionsHomeController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    BaseCompetitionsAdminController, 
    BaseCompetitionsHomeController
  ],
  providers: [BaseCompetitionsService],
  exports: [BaseCompetitionsService]
})
export class BaseCompetitionsModule {}
