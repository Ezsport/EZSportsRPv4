import { Module } from '@nestjs/common';
import { ClubsService } from './service';
import { AdminClubsController } from './ctrl.admin';
import { HomeClubsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminClubsController, HomeClubsController],
  providers: [ClubsService],
  exports: [ClubsService]
})
export class OrgClubsModule {}
