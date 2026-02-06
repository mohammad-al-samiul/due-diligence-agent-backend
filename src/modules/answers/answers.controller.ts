import { Controller, Post, Body, Patch } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { GenerateAnswerDto } from './dto/generate-answer.dto';
import { AnswerStatus } from '../../domain/enums/answer-status.enum';

@Controller()
export class AnswersController {
  constructor(private readonly service: AnswersService) {}

  @Post('generate-single-answer')
  generateSingle(@Body() dto: GenerateAnswerDto) {
    return this.service.generateSingleAnswer(dto);
  }

  @Post('generate-all-answers')
  generateAll(@Body() body: { projectId: string; questions: any[] }) {
    return this.service.generateAllAnswers(body.projectId, body.questions);
  }

  @Patch('update-answer')
  updateAnswer(
    @Body()
    body: {
      answerId: string;
      status: AnswerStatus;
      manualAnswer?: string;
    },
  ) {
    return this.service.updateAnswerStatus(
      body.answerId,
      body.status,
      body.manualAnswer,
    );
  }
}
