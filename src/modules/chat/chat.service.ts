import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatService {
  async ask(question: string) {
    /**
     * Will:
     * - retrieve document chunks
     * - generate answer
     * - attach citations
     * - NEVER mutate project / answers
     */

    return {
      answer: 'Chat-based answer from indexed documents',
      citations: [
        {
          documentId: 'doc-1',
          page: 3,
          text: 'Cited supporting snippet',
        },
      ],
    };
  }
}
