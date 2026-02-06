import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer, Citation } from '../../domain/entities/answer.entity';
import { AnswerStatus } from '../../domain/enums/answer-status.enum';
import { RequestsService } from '../requests/request.service';

type QuestionInput = {
  id: string;
  text: string;
};

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly repo: Repository<Answer>,
    private readonly requestsService: RequestsService,
  ) {}

  // ===============================
  // Generate single answer
  // ===============================
  async generateSingleAnswer(input: {
    projectId: string;
    questionId: string;
    questionText: string;
  }): Promise<{ requestId: string; answerId: string }> {
    const request = await this.requestsService.create('GENERATE_SINGLE_ANSWER');

    const answer = await this.repo.save({
      projectId: input.projectId,
      questionId: input.questionId,
      status: AnswerStatus.PENDING,
    });

    setTimeout(() => {
      void this.finishGeneration(answer.id, input, request.id);
    }, 1200);

    return {
      requestId: request.id,
      answerId: answer.id,
    };
  }

  // ===============================
  // Background processing
  // ===============================
  private async finishGeneration(
    answerId: string,
    input: {
      projectId: string;
      questionId: string;
      questionText: string;
    },
    requestId: string,
  ): Promise<void> {
    try {
      const answer = await this.repo.findOneByOrFail({ id: answerId });

      const isAnswerable = Math.random() > 0.2;

      const citations: Citation[] = isAnswerable
        ? [
            {
              documentId: 'doc-1',
              page: 2,
              text: 'Relevant cited text snippet',
            },
          ]
        : [];

      answer.aiAnswer = isAnswerable
        ? `Generated answer for: ${input.questionText}`
        : undefined;

      answer.isAnswerable = isAnswerable;
      answer.confidenceScore = isAnswerable ? 0.72 : 0;
      answer.citations = citations;
      answer.status = isAnswerable
        ? AnswerStatus.PENDING
        : AnswerStatus.MISSING_DATA;

      await this.repo.save(answer);

      await this.requestsService.updateStatus(requestId, 'COMPLETED');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';

      await this.requestsService.updateStatus(requestId, 'FAILED', message);
    }
  }

  // ===============================
  // Generate all answers
  // ===============================
  async generateAllAnswers(
    projectId: string,
    questions: QuestionInput[],
  ): Promise<{ requestId: string }> {
    const request = await this.requestsService.create('GENERATE_ALL_ANSWERS');

    for (const q of questions) {
      await this.generateSingleAnswer({
        projectId,
        questionId: q.id,
        questionText: q.text,
      });
    }

    await this.requestsService.updateStatus(request.id, 'COMPLETED');

    return { requestId: request.id };
  }

  // ===============================
  // Manual update
  // ===============================
  updateAnswerStatus(
    answerId: string,
    status: AnswerStatus,
    manualAnswer?: string,
  ) {
    return this.repo.update(answerId, {
      status,
      manualAnswer,
    });
  }
}
