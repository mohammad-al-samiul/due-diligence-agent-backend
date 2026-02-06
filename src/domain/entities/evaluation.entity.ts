import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class EvaluationResult {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  answerId: string;

  @Column({ type: 'text' })
  humanAnswer: string;

  @Column({ type: 'float' })
  semanticScore: number;

  @Column({ type: 'float' })
  keywordScore: number;

  @Column({ type: 'float' })
  finalScore: number;

  @Column({ type: 'text' })
  explanation: string;
}
