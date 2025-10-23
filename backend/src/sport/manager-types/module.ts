import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ManagerTypeService } from './service';
import { AdminManagerTypeController } from './ctrl.admin';
import { HomeManagerTypeController } from './ctrl.home';
import { SportManagerTypeDto } from './dto';

@Module({
  controllers: [AdminManagerTypeController, HomeManagerTypeController],
  providers: [ManagerTypeService, SportManagerTypeDto],
  imports: [PrismaModule],
  exports: [ManagerTypeService]
})
export class SportManagerTypeModule { }
