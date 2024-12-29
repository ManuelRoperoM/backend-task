import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
                  .addBearerAuth()
                  .setTitle('Task Manager')
                  .setDescription('API para gestionar tareas')
                  .setVersion('1.0')
                  .addTag('tasks')
                  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  dotenv.config();
  await app.listen(process.env.PORT);
}
bootstrap();
