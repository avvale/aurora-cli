import { Module } from '@nestjs/common';
import { CorePreparationRequestController, SequelizeConfigModule } from 'aurora-ts-core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        SequelizeConfigModule,
    ],
    controllers: [
        CorePreparationRequestController
    ],
    exports: []
})
export class CoreModule {}