import { Module } from '@nestjs/common';
import { SportsService } from './service';
import { AdminSportsController } from './ctrl.admin';
import { HomeSportsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AdminSportsController, HomeSportsController],
  providers: [SportsService],
  imports: [PrismaModule],
  exports: [SportsService]
})
export class BaseSportsModule {}
