import { Module } from '@nestjs/common';
import { LeaguesService } from './service';
import { AdminLeaguesController } from './ctrl.admin';
import { HomeLeaguesController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminLeaguesController, HomeLeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService]
})
export class OrgLeaguesModule {}
