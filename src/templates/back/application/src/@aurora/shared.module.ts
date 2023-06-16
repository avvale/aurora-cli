import { CoreGetFallbackLangFromJsonService, CoreGetLangsFromJsonService } from '@aurora/modules/lang';
import { AuditingRunner, AuditingRunnerDisabledImplementationService, CoreAddI18nConstraintService, CoreGetContentLanguageObjectService, CoreGetFallbackLangService, CoreGetLangsService, CoreGetSearchKeyLangService, CoreModule } from '@aurorajs.dev/core';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsConfigModule } from './cqrs-config.module';

@Module({
    imports: [
        CacheModule.register({ isGlobal: true, ttl: 0 }),
        ConfigModule.forRoot({ isGlobal: true }),
        CoreModule,
        CqrsConfigModule,
        CqrsModule
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
        },
    ],
    exports: [
        CoreAddI18nConstraintService,
        AuditingRunner,
        CacheModule,
        ConfigModule,
        CoreGetContentLanguageObjectService,
        CoreGetFallbackLangService,
        CoreGetLangsService,
        CoreGetSearchKeyLangService,
        CqrsConfigModule
    ],
})
export class SharedModule {}
