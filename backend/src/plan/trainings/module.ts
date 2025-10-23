import { Module } from '@nestjs/common';
import { PlanTrainingsService } from './service';
import { AdminPlanTrainingsController } from './ctrl.admin';
import { HomePlanTrainingsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminPlanTrainingsController, HomePlanTrainingsController],
  providers: [PlanTrainingsService],
  exports: [PlanTrainingsService]
})
export class PlanTrainingsModule {}
