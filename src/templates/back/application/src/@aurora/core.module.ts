import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurora-ts/core';
import { SharedModule } from './shared.module';
import { GraphQLConfigModule } from './graphql/graphql-config.module';
import { BootstrapService } from './services/bootstrap.service';

@Module({
    imports: [
        GraphQLConfigModule,
        SequelizeConfigModule,
        SharedModule,
    ],
    controllers: [
        CoreEnvironmentInformationController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
    ],
})
export class CoreModule {}