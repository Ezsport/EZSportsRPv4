import { Module } from '@nestjs/common';
import { FieldsService } from './service';
import { PrismaModule } from '../../prisma/prisma.module';
import { AdminFieldsController } from './ctrl.admin';
import { HomeFieldsController } from './ctrl.home';

@Module({
  controllers: [AdminFieldsController, HomeFieldsController],
  providers: [FieldsService],
  imports: [PrismaModule],
  exports: [FieldsService]
})
export class BaseFieldsModule {}
