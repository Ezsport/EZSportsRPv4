import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CoachTypeService } from './service';
import { AdminCoachTypeController } from './ctrl.admin';
import { HomeCoachTypeController } from './ctrl.home';
import { SportCoachTypeDto } from './dto';

@Module({
  controllers: [AdminCoachTypeController, HomeCoachTypeController],
  providers: [CoachTypeService, SportCoachTypeDto],
  imports: [PrismaModule],
  exports: [CoachTypeService]
})
export class SportCoachTypeModule { }
