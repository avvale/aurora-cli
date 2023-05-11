import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ICommandBus, ICriteria, IQueryBus, NestCommandBus, NestQueryBus, SequelizeCriteria } from '@aurorajs.dev/core';

@Module({
    imports: [
        CqrsModule,
    ],
    providers: [
        {
            provide : ICommandBus,
            useClass: NestCommandBus,
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus,
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria,
        },
    ],
    exports: [
        CqrsModule,
        {
            provide : ICommandBus,
            useClass: NestCommandBus,
        },
        {
            provide : IQueryBus,
            useClass: NestQueryBus,
        },
        {
            provide : ICriteria,
            useClass: SequelizeCriteria,
        },
    ],
})
export class CqrsConfigModule {}
