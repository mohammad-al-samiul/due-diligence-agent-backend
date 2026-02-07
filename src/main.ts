import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') || 3000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
   
  */
  console.log(
    `Application is running on: http://localhost:${process.env.PORT}`,
  );
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
