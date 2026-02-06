import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from './documents.service';

@Controller('index-document-async')
export class DocumentsController {
  constructor(private readonly service: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5_000_000 }), // 5MB
          new FileTypeValidator({
            fileType: /(pdf|txt|docx)/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<{ requestId: string; documentId: string }> {
    return this.service.uploadAndIndex(file);
  }
}
