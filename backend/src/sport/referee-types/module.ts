import { Module } from '@nestjs/common';
import { RefereeTypeService } from './service';
import { RefereeTypeHomeController } from './ctrl.home';
import { RefereeTypeAdminController } from './ctrl.admin';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RefereeTypeHomeController, RefereeTypeAdminController],
  providers: [RefereeTypeService],
  exports: [RefereeTypeService],
})
export class SportRefereeTypeModule {}
