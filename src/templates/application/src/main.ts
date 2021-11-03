import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setTimeZoneApplication } from 'aurora-ts-core';
import { AppModule } from './app.module';
import { urlencoded, json } from 'express';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as dayjs from 'dayjs';

// dayjs configuration
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

async function bootstrap()
{
    const app           = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    // set swagger config
    const options = new DocumentBuilder()
        .setTitle('Hades API')
        .setDescription('API to consume Hades services')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // set limit of request allowed
    app.use(json({ limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.use(urlencoded({ extended: true, limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE') }));

    // set timezone application from .env APP_TIMEZONE on dayjs
    setTimeZoneApplication(configService, dayjs);

    await app.listen(configService.get<number>('APP_PORT'));
}

bootstrap();