import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { AddI18NConstraintService, CoreModule } from '@aurora-ts/core';
import { CqrsConfigModule } from './cqrs-config.module';

@Module({
    imports: [
        CacheModule.register(),
        ConfigModule.forRoot({ isGlobal: true }),
        CoreModule,
        CqrsConfigModule,
        CqrsModule,
        HttpModule,
    ],
    providers: [
        AddI18NConstraintService,
    ],
    exports: [
        AddI18NConstraintService,
        CacheModule,
        ConfigModule,
        CqrsConfigModule,
        HttpModule,
    ],
})
export class SharedModule {}
