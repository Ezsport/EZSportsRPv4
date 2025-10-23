import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { GamePeriodService } from './service';
import { AdminGamePeriodController } from './ctrl.admin';
import { HomeGamePeriodController } from './ctrl.home';
import { SportGamePeriodDto } from './dto';

@Module({
  controllers: [AdminGamePeriodController, HomeGamePeriodController],
  providers: [GamePeriodService, SportGamePeriodDto],
  imports: [PrismaModule],
  exports: [GamePeriodService]
})
export class SportGamePeriodModule { }
