import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { setTimeZoneApplication } from '@aurorajs.dev/core';
import { urlencoded, json } from 'express';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import * as dayjs from 'dayjs';

// dayjs configuration
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

async function bootstrap(): Promise<void>
{
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);

    if (configService.get<string>('SWAGGER') === 'true')
    {
        const options = new DocumentBuilder()
            .setTitle('Aurora API')
            .setDescription('Aurora API description')
            .setVersion('1.0')
            .addBearerAuth()
            .build();
        const document = SwaggerModule.createDocument(app, options);
        SwaggerModule.setup('api', app, document);
    }

    // set limit of request allowed
    app.use(json({ limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE') }));
    app.use(urlencoded({ extended: true, limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE') }));

    // set graphql upload files, workaround for import graphql-upload
    const { default: graphqlUploadExpress } = await(
        eval('import(\'graphql-upload/graphqlUploadExpress.mjs\')') as Promise<typeof import('graphql-upload/graphqlUploadExpress.mjs')>
    );
    app.use(graphqlUploadExpress({
        maxFileSize: +configService.get<string>('APP_MAX_FILE_SIZE_UPLOADED'),  // 50000000 = 50 MB, value in bytes
        maxFiles   : configService.get<string>('APP_MAX_FILES_UPLOADED'),       // max files uploaded at once
    }));

    // set timezone application from .env APP_TIMEZONE on dayjs
    setTimeZoneApplication(configService, dayjs);

    app.enableCors();
    await app.listen(configService.get<number>('APP_PORT'));
}

bootstrap();