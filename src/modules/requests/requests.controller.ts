import { Controller, Get, Param } from '@nestjs/common';
import { RequestsService } from './request.service';

@Controller('get-request-status')
export class RequestsController {
  constructor(private readonly service: RequestsService) {}

  @Get(':id')
  getStatus(@Param('id') id: string) {
    return this.service.get(id);
  }
}
