import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { RefereeService } from './service';
import { AdminRefereeController } from './ctrl.admin';
import { HomeRefereeController } from './ctrl.home';
import { MemberRefereeDto } from './dto';

@Module({
  controllers: [AdminRefereeController, HomeRefereeController],
  providers: [RefereeService, MemberRefereeDto],
  imports: [PrismaModule],
  exports: [RefereeService]
})
export class MemberRefereeModule { }
