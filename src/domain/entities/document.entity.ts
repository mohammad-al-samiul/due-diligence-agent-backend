import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { DocumentStatus } from '../enums/document-status.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column()
  mimeType: string;

  @Column()
  path: string;

  @Column({
    type: 'enum',
    enum: DocumentStatus,
  })
  status: DocumentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
