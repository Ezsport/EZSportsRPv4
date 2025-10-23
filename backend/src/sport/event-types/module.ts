import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { EventTypeService } from './service';
import { AdminEventTypeController } from './ctrl.admin';
import { HomeEventTypeController } from './ctrl.home';
import { SportEventTypeDto } from './dto';

@Module({
  controllers: [AdminEventTypeController, HomeEventTypeController],
  providers: [EventTypeService, SportEventTypeDto],
  imports: [PrismaModule],
  exports: [EventTypeService]
})
export class SportEventTypeModule { }
