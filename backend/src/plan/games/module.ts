import { Module } from '@nestjs/common';
import { PlanGamesService } from './service';
import { AdminPlanGamesController } from './ctrl.admin';
import { HomePlanGamesController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminPlanGamesController, HomePlanGamesController],
  providers: [PlanGamesService],
  exports: [PlanGamesService]
})
export class PlanGamesModule {}
