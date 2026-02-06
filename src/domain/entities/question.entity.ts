import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  questionnaireId: string;

  @Column()
  section: string;

  @Column()
  order: number;

  @Column({ type: 'text' })
  text: string;
}
