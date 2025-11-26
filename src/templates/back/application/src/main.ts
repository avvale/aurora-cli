import { memoryWatcher, setTimeZoneApplication } from '@aurorajs.dev/core';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dayjs from 'dayjs';
import * as advancedFormat from 'dayjs/plugin/advancedFormat';
import * as dayOfYear from 'dayjs/plugin/dayOfYear';
import * as isoWeek from 'dayjs/plugin/isoWeek';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';
import { json, urlencoded } from 'express';
import { env } from 'node:process';
import { logger } from './@aurora/services';
import { AppModule } from './app.module';

// dayjs configuration
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(dayOfYear);

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, { logger: logger() });
    const configService = app.get(ConfigService);

    if (configService.get<string>('SWAGGER') === 'true') {
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
    app.use(
        json({ limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE') }),
    );
    app.use(
        urlencoded({
            extended: true,
            limit: configService.get<string>('APP_LIMIT_REQUEST_SIZE'),
        }),
    );

    // set graphql upload files, workaround for import graphql-upload
    const { default: graphqlUploadExpress } = await (eval(
        "import('graphql-upload/graphqlUploadExpress.mjs')",
    ) as Promise<typeof import('graphql-upload/graphqlUploadExpress.mjs')>);
    app.use(
        '/graphql',
        graphqlUploadExpress({
            maxFileSize: +configService.get<string>(
                'APP_MAX_FILE_SIZE_UPLOADED',
            ), // 50000000 = 50 MB, value in bytes
            maxFiles: configService.get<string>('APP_MAX_FILES_UPLOADED'), // max files uploaded at once
        }),
    );

    // set timezone application from .env APP_TIMEZONE on dayjs
    setTimeZoneApplication(configService, dayjs);

    app.enableCors();
    await app.listen(configService.get<number>('APP_PORT') ?? 3000);

    if (env.NODE_ENV !== 'production') {
        memoryWatcher();
    }
}

bootstrap();
