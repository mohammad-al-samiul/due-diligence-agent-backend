import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../../domain/entities/document.entity';

import { RequestsModule } from '../requests/requests.module';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { ProjectsModule } from '../projects/projects.module';
import { LocalStorageService } from 'src/shared/storage/local-storage.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    BullModule.registerQueue({
      name: 'documents',
    }),
    RequestsModule,
    ProjectsModule,
  ],
  providers: [DocumentsService, LocalStorageService],
  controllers: [DocumentsController],
  exports: [DocumentsService, LocalStorageService],
})
export class DocumentsModule {}
