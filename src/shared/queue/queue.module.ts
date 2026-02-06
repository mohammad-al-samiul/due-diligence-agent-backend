import { Module } from '@nestjs/common';
import { queueProvider } from './queue.provider';

@Module({
  providers: [queueProvider],
  exports: [queueProvider],
})
export class SharedModule {}
