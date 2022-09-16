const { PORT }: NodeJS.ProcessEnv = process.env;

import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import helmet from 'helmet';

import { AppModule } from 'src/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /* CORS */
  app.enableCors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  /* API Prefix */
  app.setGlobalPrefix('/api');

  /* Versioning */
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  /* Validations */
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());

  /* Swagger */
  const config = new DocumentBuilder()
    .setTitle('SGP - OPEN API V1.0')
    .setDescription('Documentation of SGP API endpoints')
    .setVersion('1.0')
    .addServer('https://api-sgp-prd.herokuapp.com', 'Production host')
    .addServer('https://api-sgp-hml.herokuapp.com', 'Homologation host')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT || 3000);
}
bootstrap();
