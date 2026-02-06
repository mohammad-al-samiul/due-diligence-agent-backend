/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from '@nestjs/common';

@Injectable()
export class EvaluationService {
  async evaluate(aiAnswer: string, humanAnswer: string) {
    // TODO: replace with embedding similarity + keyword extraction
    const semanticScore = 0.78;
    const keywordScore = 0.65;

    return {
      semanticScore,
      keywordScore,
      finalScore: 0.7 * semanticScore + 0.3 * keywordScore,
      explanation: 'AI answer semantically matches core intent',
    };
  }
}
