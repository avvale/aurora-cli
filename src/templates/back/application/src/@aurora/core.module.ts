import { Module } from '@nestjs/common';
import { CoreEnvironmentInformationController, CoreGetFallbackLangController, CoreGetFallbackLangHandler, CoreGetFallbackLangResolver, CoreGetLangsController, CoreGetLangsHandler, CoreGetLangsResolver, CoreGetSearchKeyLangController, CoreGetSearchKeyLangHandler, CoreGetSearchKeyLangResolver, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurorajs.dev/core';
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
        CoreGetFallbackLangController,
        CoreGetLangsController,
        CoreGetSearchKeyLangController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
        CoreGetFallbackLangHandler,
        CoreGetFallbackLangResolver,
        CoreGetLangsHandler,
        CoreGetLangsResolver,
        CoreGetSearchKeyLangHandler,
        CoreGetSearchKeyLangResolver,
    ],
})
export class CoreModule {}