import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { ICommandBus, NestCommandBus, IQueryBus, NestQueryBus } from '@aurora/cqrs';
import { CoreModule as AuroraCoreModule, ICriteria, SequelizeCriteria } from 'aurora-ts-core';

@Module({
    imports: [
        AuroraCoreModule,
        ConfigModule.forRoot({ isGlobal: true }),
        CqrsModule
    ],
    providers: [
        {
            provide : ICommandBus,
            useClass: NestCommandBus
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria
        }
    ],
    exports: [
        ConfigModule,
        CqrsModule,
        {
            provide : ICommandBus,
            useClass: NestCommandBus
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria
        }
    ]
})
export class SharedModule {}
