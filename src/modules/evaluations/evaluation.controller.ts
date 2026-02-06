import { Controller, Post, Body } from '@nestjs/common';
import { EvaluationService } from './evaluations.service';

@Controller()
export class EvaluationController {
  constructor(private readonly service: EvaluationService) {}

  @Post('evaluate-answer')
  async evaluate(
    @Body() body: { answerId: string; aiAnswer: string; humanAnswer: string },
  ) {
    return this.service.evaluate(body.aiAnswer, body.humanAnswer);
  }
}
