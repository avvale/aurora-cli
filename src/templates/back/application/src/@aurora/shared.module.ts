import { CoreGetFallbackLangFromJsonService, CoreGetLangsFromJsonService } from '@aurora/modules/lang';
import { AuditingRunner, AuditingRunnerDisabledImplementationService, AuroraMetadataModule, CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetFallbackLangService, CoreGetLangsService, CoreGetSearchKeyLangService, CoreModule } from '@aurorajs.dev/core';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { SentryModule } from './modules';

@Module({
    imports: [
        AuroraMetadataModule,
        CacheModule.register({ isGlobal: true, ttl: 0 }),
        ConfigModule.forRoot({
            isGlobal   : true,
            envFilePath: ['../.env', '.env'],
        }),
        CoreModule,
        CqrsModule,
        SentryModule.forRootAsync({
            imports   : [ConfigModule],
            inject    : [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dsn        : configService.get('SENTRY_DSN'),
                environment: configService.get('SENTRY_ENVIRONMENT'),
                release    : configService.get('SENTRY_PROJECT') + '@' + process.env.npm_package_version,
            }),
        }),
    ],
    providers: [
        CoreAddI18nConstraintService,
        CoreGetContentLanguageObjectService,
        CoreGetSearchKeyLangService,
        {
            provide : AuditingRunner,
            useClass: AuditingRunnerDisabledImplementationService,
        },
        {
            provide : CoreGetLangsService,
            useClass: CoreGetLangsFromJsonService,
        },
        {
            provide : CoreGetFallbackLangService,
            useClass: CoreGetFallbackLangFromJsonService,
        }
    ],
    exports: [
        AuditingRunner,
        AuroraMetadataModule,
        CacheModule,
        ConfigModule,
        CoreAddI18nConstraintService,
        CoreGetContentLanguageObjectService,
        CoreGetFallbackLangService,
        CoreGetLangsService,
        CoreGetSearchKeyLangService,
        SentryModule
    ],
})
export class SharedModule {}
