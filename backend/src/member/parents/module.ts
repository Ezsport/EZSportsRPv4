import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { ParentService } from './service';
import { AdminParentController } from './ctrl.admin';
import { HomeParentController } from './ctrl.home';
import { MemberParentDto } from './dto';

@Module({
  controllers: [AdminParentController, HomeParentController],
  providers: [ParentService, MemberParentDto],
  imports: [PrismaModule],
  exports: [ParentService]
})
export class MemberParentModule { }
