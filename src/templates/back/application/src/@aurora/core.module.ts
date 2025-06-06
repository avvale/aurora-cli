import { CoreEnvironmentInformationController, CoreGetFallbackLangController, CoreGetFallbackLangHandler, CoreGetFallbackLangResolver, CoreGetLangsController, CoreGetLangsHandler, CoreGetLangsResolver, CoreGetSearchKeyLangController, CoreGetSearchKeyLangHandler, CoreGetSearchKeyLangResolver, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurorajs.dev/core';
import { Module } from '@nestjs/common';
import { GraphQLConfigModule, MailerCLientModule } from './modules';
import { BootstrapService } from './services/bootstrap.service';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        GraphQLConfigModule,
        MailerCLientModule.forRootAsync(),
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