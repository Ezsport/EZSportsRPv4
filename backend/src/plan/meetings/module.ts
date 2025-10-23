import { Module } from '@nestjs/common';
import { PlanMeetingsService } from './service';
import { AdminPlanMeetingsController } from './ctrl.admin';
import { HomePlanMeetingsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminPlanMeetingsController, HomePlanMeetingsController],
  providers: [PlanMeetingsService],
  exports: [PlanMeetingsService]
})
export class PlanMeetingsModule {}
