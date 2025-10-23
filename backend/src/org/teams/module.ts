import { Module } from '@nestjs/common';
import { TeamsService } from './service';
import { AdminTeamsController } from './ctrl.admin';
import { HomeTeamsController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminTeamsController, HomeTeamsController],
  providers: [TeamsService],
  exports: [TeamsService]
})
export class OrgTeamsModule {}
