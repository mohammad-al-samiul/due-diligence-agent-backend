import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../../domain/entities/document.entity';
import { DocumentStatus } from '../../domain/enums/document-status.enum';
import { LocalStorageService } from '../../shared/storage/local-storage.service';
import { RequestsService } from '../requests/request.service';
import { UploadFile } from 'src/shared/types/upload-file';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private repo: Repository<Document>,
    private requestsService: RequestsService,
    private storage: LocalStorageService,
    @InjectQueue('documents')
    private queue: Queue,
  ) {}

  async uploadAndIndex(file: UploadFile) {
    const request = await this.requestsService.create('INDEX_DOCUMENT');

    const stored = await this.storage.save(file);

    const document = await this.repo.save({
      filename: stored.filename,
      path: stored.path,
      mimeType: file.mimetype,
      status: DocumentStatus.UPLOADED,
    });

    // 👇 HERE (setTimeout er jaygay)
    await this.queue.add('INDEX_DOCUMENT', {
      documentId: document.id,
      requestId: request.id,
    });

    return {
      requestId: request.id,
      documentId: document.id,
    };
  }
}
