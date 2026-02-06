import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from '../../domain/entities/request.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private repo: Repository<Request>,
  ) {}

  create(type: string) {
    return this.repo.save({ type, status: 'PENDING' });
  }

  updateStatus(id: string, status: Request['status'], error?: string) {
    return this.repo.update(id, { status, error });
  }

  get(id: string) {
    return this.repo.findOneBy({ id });
  }
}
