import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { AddI18nConstraintService, AuditingRunner, AuditingRunnerDisabledImplementationService, CoreModule } from '@aurorajs.dev/core';
import { CqrsConfigModule } from './cqrs-config.module';

@Module({
    imports: [
        CacheModule.register(),
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
    ],
    exports: [
        AddI18nConstraintService,
        AuditingRunner,
        CacheModule,
        ConfigModule,
        CqrsConfigModule
    ],
})
export class SharedModule {}
