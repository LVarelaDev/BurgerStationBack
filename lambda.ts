import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import serverlessExpress from '@vendia/serverless-express';
import { APIGatewayProxyHandler } from 'aws-lambda';
import express from 'express';
import { AppModule } from './src/app.module';
import { HttpExceptionFilter } from './src/common/exceptions/http-exception.filter';
import { ApiResponseInterceptor } from './src/common/interceptors/api-response.interceptor';

let cachedServer: any;

async function bootstrap(): Promise<ReturnType<typeof serverlessExpress>> {
  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ApiResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Burger Station API')
    .setDescription('This API allows you to manage your burger station orders')
    .setVersion('1.0')
    .addTag('Burger Station')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.init();

  return serverlessExpress({ app: expressApp });
}

export const handler: APIGatewayProxyHandler = async (
  event,
  context,
  callback,
) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return (await cachedServer(event, context, callback)) as any;
};
