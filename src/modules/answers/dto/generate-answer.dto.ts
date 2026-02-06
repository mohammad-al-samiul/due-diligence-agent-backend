import { IsString } from 'class-validator';

export class GenerateAnswerDto {
  @IsString()
  projectId: string;

  @IsString()
  questionId: string;

  @IsString()
  questionText: string;
}
