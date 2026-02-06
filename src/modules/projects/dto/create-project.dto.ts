import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  name: string;

  @IsString()
  questionnaireId: string;

  @IsOptional()
  @IsIn(['ALL_DOCS', 'EXPLICIT'])
  documentScope?: 'ALL_DOCS' | 'EXPLICIT';
}
