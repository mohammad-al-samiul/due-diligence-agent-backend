import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// shared
import { LocalStorageService } from './shared/storage/local-storage.service';

// core modules
import { RequestsModule } from './modules/requests/requests.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { ProjectsModule } from './modules/projects/projects.module';

import { ChatModule } from './modules/chat/chat.module';
import { EvaluationModule } from './modules/evaluations/evaluation.module';

@Module({
  imports: [
    /* ===============================
       Global Config
    =============================== */
    ConfigModule.forRoot({ isGlobal: true }),

    /* ===============================
       Database (Postgres)
    =============================== */
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get<string>('DATABASE_URL'),
        ssl: {
          rejectUnauthorized: false,
        },
        autoLoadEntities: true,
        synchronize: true, // ❗ dev only
      }),
    }),

    /* ===============================
       Redis + BullMQ
    =============================== */
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        connection: {
          host: config.get<string>('REDIS_HOST') || 'localhost',
          port: config.get<number>('REDIS_PORT') || 6379,
        },
      }),
    }),

    BullModule.registerQueue({
      name: 'jobs',
    }),

    /* ===============================
       Feature Modules
    =============================== */
    RequestsModule,
    DocumentsModule,
    ProjectsModule,
    EvaluationModule,
    ChatModule,
  ],

  controllers: [AppController],

  providers: [
    AppService,
    LocalStorageService, // storage abstraction
  ],
})
export class AppModule {}
