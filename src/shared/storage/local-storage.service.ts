import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuid } from 'uuid';

type UploadFile = {
  originalname: string;
  buffer: Buffer;
};

@Injectable()
export class LocalStorageService {
  private readonly basePath = path.join(process.cwd(), 'storage');

  constructor() {
    if (!fs.existsSync(this.basePath)) {
      fs.mkdirSync(this.basePath, { recursive: true });
    }
  }

  async save(file: UploadFile) {
    const id = uuid();
    const filePath = path.join(this.basePath, `${id}-${file.originalname}`);

    await fs.promises.writeFile(filePath, file.buffer);

    return {
      path: filePath,
      filename: file.originalname,
    };
  }
}
