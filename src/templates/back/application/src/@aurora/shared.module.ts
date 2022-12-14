import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsConfigModule } from './cqrs-config.module';
import { AddI18NConstraintService, CoreModule } from '@aurora-ts/core';

@Module({
    imports: [
        CoreModule,
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsConfigModule,
    ],
    providers: [
        AddI18NConstraintService,
    ],
    exports: [
        AddI18NConstraintService,
        CacheModule,
        ConfigModule,
        CqrsConfigModule,
    ],
})
export class SharedModule {}
