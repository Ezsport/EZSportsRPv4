import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { PlayerService } from './service';
import { AdminPlayerController } from './ctrl.admin';
import { HomePlayerController } from './ctrl.home';
import { MemberPlayerDto } from './dto';

@Module({
  controllers: [AdminPlayerController, HomePlayerController],
  providers: [PlayerService, MemberPlayerDto],
  imports: [PrismaModule],
  exports: [PlayerService]
})
export class MemberPlayerModule { }
