import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',

  url: 'postgres://postgres:postgres@localhost:5432/questionnaire_agent',
  autoLoadEntities: true,
  synchronize: true, // dev only
};
