import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './sys/auth/module';
import { BaseCompetitionsModule } from './base/competitions/module';
import { BaseCountriesModule } from './base/countries/module';
import { BaseSportsModule } from './base/sports/module';
import { BaseFieldsModule } from './base/fields/module';
import { OrgTeamsModule } from './org/teams/module';
import { SportEventTypeModule } from './sport/event-types/module';
import { SportManagerTypeModule } from './sport/manager-types/module';
import { SportPlayerPositionModule } from './sport/player-positions/module';
import { SportGamePeriodModule } from './sport/game-periods/module';
import { MemberClubAdminModule } from './member/club-admins/module';
import { MemberCoachModule } from './member/coaches/module';
import { MemberParentModule } from './member/parents/module';
import { MemberTeamManagerModule } from './member/team-managers/module';
import { MemberPersonModule } from './member/persons/module';
import { MemberPlayerModule } from './member/players/module';
import { MemberRefereeModule } from './member/referees/module';
import { MemberSponsorModule } from './member/sponsors/module';
import { OrgClubsModule } from './org/clubs/module';
import { OrgLeaguesModule } from './org/leagues/module';
import { BaseGroupLevelsModule } from './base/group-levels/module';
import { PlanGamesModule } from './plan/games/module';
import { PlanMeetingsModule } from './plan/meetings/module';
import { PlanTrainingsModule } from './plan/trainings/module';
import { SportCoachTypeModule } from './sport/coach-types/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env']
    }),
    PrismaModule,
    // AuthModule,
    BaseCompetitionsModule,
    BaseSportsModule,
    BaseCountriesModule,
    BaseFieldsModule,
    BaseGroupLevelsModule,
    MemberPersonModule,
    MemberClubAdminModule,
    MemberCoachModule,
    MemberParentModule,
    MemberTeamManagerModule,
    MemberPlayerModule,
    MemberRefereeModule,
    MemberSponsorModule,
    OrgClubsModule,
    OrgLeaguesModule,
    OrgTeamsModule,
    PlanGamesModule,
    PlanMeetingsModule,
    PlanTrainingsModule,
    SportCoachTypeModule,
    SportEventTypeModule,
    SportGamePeriodModule,
    SportManagerTypeModule,
    SportPlayerPositionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
