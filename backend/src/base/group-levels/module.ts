import { Module } from '@nestjs/common';
import { GroupLevelsService } from './service';
import { AdminGroupLevelsController } from './ctrl.admin';
import { HomeGroupLevelsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminGroupLevelsController, HomeGroupLevelsController],
  providers: [GroupLevelsService],
  exports: [GroupLevelsService]
})

export class BaseGroupLevelsModule { }
