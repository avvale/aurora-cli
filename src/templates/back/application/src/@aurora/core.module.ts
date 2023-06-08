import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CoreGetFallbackLangController, CoreGetLangsController, CoreGetLangsHandler, CoreGetLangsResolver, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurorajs.dev/core';
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
        CoreGetFallbackLangController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
        CoreGetLangsHandler,
        CoreGetLangsHandler,
        CoreGetLangsResolver,
    ],
})
export class CoreModule {}