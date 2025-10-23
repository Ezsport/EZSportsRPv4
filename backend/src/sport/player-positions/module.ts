import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerPositionService } from './service';
import { AdminPlayerPositionController } from './ctrl.admin';
import { HomePlayerPositionController } from './ctrl.home';
import { SportPlayerPositionDto } from './dto';

@Module({
  controllers: [AdminPlayerPositionController, HomePlayerPositionController],
  providers: [PlayerPositionService, SportPlayerPositionDto],
  imports: [PrismaModule],
  exports: [PlayerPositionService]
})
export class SportPlayerPositionModule { }
