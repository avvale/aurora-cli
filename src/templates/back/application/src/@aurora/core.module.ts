import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CoreGetLangsController, CoreGetLangsHandler, CoreGetLangsResolver, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurorajs.dev/core';
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
        CoreGetLangsController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
        CoreGetLangsHandler,
        CoreGetLangsResolver,
    ],
})
export class CoreModule {}