import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { writeFileSync } from 'fs';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('EZSportsRP API')
    .setVersion('2.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Export swagger.json file locally
  const outputPath = join(process.cwd(), 'swagger.json');
  writeFileSync(outputPath, JSON.stringify(document, null, 2));
  console.log(`✅ Swagger spec generated at: ${outputPath}`);

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
