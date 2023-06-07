import { CoreGetLangsFromJsonService } from '@aurora/modules/lang';
import { AddI18nConstraintService, AuditingRunner, AuditingRunnerDisabledImplementationService, CoreGetLangsService, CoreModule } from '@aurorajs.dev/core';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsConfigModule } from './cqrs-config.module';

@Module({
    imports: [
        CacheModule.register({ isGlobal: true }),
        ConfigModule.forRoot({ isGlobal: true }),
        CoreModule,
        CqrsConfigModule,
        CqrsModule
    ],
    providers: [
        AddI18nConstraintService,
        {
            provide : AuditingRunner,
            useClass: AuditingRunnerDisabledImplementationService,
        },
        {
            provide : CoreGetLangsService,
            useClass: GetLangsFromJsonService,
        },
    ],
    exports: [
        AddI18nConstraintService,
        AuditingRunner,
        CacheModule,
        ConfigModule,
        CoreGetLangsService,
        CqrsConfigModule
    ],
})
export class SharedModule {}
