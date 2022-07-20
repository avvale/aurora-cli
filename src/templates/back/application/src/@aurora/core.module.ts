import { Module } from '@nestjs/common';
import { CorePreparationRequestController, CoreStatusController, CoreVersionController, SequelizeConfigModule } from 'aurora-ts-core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        SequelizeConfigModule,
    ],
    controllers: [
        CorePreparationRequestController,
        CoreStatusController,
        CoreVersionController,
    ],
    exports: [],
})
export class CoreModule {}