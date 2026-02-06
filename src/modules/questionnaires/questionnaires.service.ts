import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/domain/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionnairesService {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
  ) {}

  async parseQuestionnaire(questionnaireId: string, rawText: string) {
    /**
     * PDF parsing output assumed:
     * [
     *   { section: 'Fund Overview', text: 'What is the fund size?' }
     * ]
     */

    const parsed = rawText.split('\n').filter(Boolean);

    let order = 0;
    for (const line of parsed) {
      await this.repo.save({
        questionnaireId,
        section: 'General',
        order: order++,
        text: line,
      });
    }
  }

  getQuestions(questionnaireId: string) {
    return this.repo.find({
      where: { questionnaireId },
      order: { order: 'ASC' },
    });
  }
}
