import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { CoachService } from './service';
import { AdminCoachController } from './ctrl.admin';
import { HomeCoachController } from './ctrl.home';
import { MemberCoachDto } from './dto';

@Module({
  controllers: [AdminCoachController, HomeCoachController],
  providers: [CoachService, MemberCoachDto],
  imports: [PrismaModule],
  exports: [CoachService]
})
export class MemberCoachModule { }
