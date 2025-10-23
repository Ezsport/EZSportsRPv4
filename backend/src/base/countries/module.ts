import { Module } from '@nestjs/common';
import { CountriesService } from './service';
import { AdminCountriesController } from './ctrl.admin';
import { HomeCountriesController } from './ctrl.home';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  controllers: [AdminCountriesController, HomeCountriesController],
  providers: [CountriesService],
  imports: [PrismaModule],
  exports: [CountriesService]
})

export class BaseCountriesModule { }
