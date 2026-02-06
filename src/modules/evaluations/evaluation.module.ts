import { Module } from '@nestjs/common';

import { EvaluationController } from './evaluation.controller';
import { EvaluationService } from './evaluations.service';

@Module({
  providers: [EvaluationService],
  controllers: [EvaluationController],
})
export class EvaluationModule {}
