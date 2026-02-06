import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { AnswerStatus } from '../enums/answer-status.enum';

export type Citation = {
  documentId: string;
  page: number;
  text: string;
};

@Entity()
export class Answer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  projectId: string;

  @Column()
  questionId: string;

  @Column({ type: 'text', nullable: true })
  aiAnswer?: string;

  @Column({ default: false })
  isAnswerable: boolean;

  @Column({ type: 'float', default: 0 })
  confidenceScore: number;

  @Column({ type: 'jsonb', nullable: true })
  citations?: Citation[];

  @Column({
    type: 'enum',
    enum: AnswerStatus,
    default: AnswerStatus.PENDING,
  })
  status: AnswerStatus;

  @Column({ type: 'text', nullable: true })
  manualAnswer?: string;

  @CreateDateColumn()
  createdAt: Date;
}
