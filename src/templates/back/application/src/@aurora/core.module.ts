import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from 'aurora-ts-core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';

@Module({
    imports: [
        SharedModule,
        GraphQLConfigModule,
        SequelizeConfigModule,
    ],
    controllers: [
        CoreEnvironmentInformationController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    exports: [],
})
export class CoreModule {}