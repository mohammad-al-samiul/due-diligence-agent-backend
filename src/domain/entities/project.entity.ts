import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { ProjectStatus } from '../enums/project-status.enum';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  questionnaireId?: string;

  @Column({
    default: 'ALL_DOCS',
  })
  documentScope: 'ALL_DOCS' | 'EXPLICIT';

  @Column({
    type: 'enum',
    enum: ProjectStatus,
  })
  status: ProjectStatus;

  @Column({ nullable: true })
  configHash?: string;

  @CreateDateColumn()
  createdAt: Date;
}
