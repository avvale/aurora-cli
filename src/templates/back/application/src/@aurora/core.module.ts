import { CoreEnvironmentInformationController, CoreGetBase64FromFileController, CoreGetBase64FromFileHandler, CoreGetBase64FromFileResolver, CoreGetFallbackLangController, CoreGetFallbackLangHandler, CoreGetFallbackLangResolver, CoreGetLangsController, CoreGetLangsHandler, CoreGetLangsResolver, CoreGetSearchKeyLangController, CoreGetSearchKeyLangHandler, CoreGetSearchKeyLangResolver, CorePreparationRequestController, CoreStatusController, SequelizeConfigModule } from '@aurorajs.dev/core';
import { Module } from '@nestjs/common';
import { GraphQLConfigModule, MailerCLientModule } from './modules';
import { BootstrapService } from './services/bootstrap.service';
import { SharedModule } from './shared.module';

@Module({
    imports: [
        GraphQLConfigModule,
        MailerCLientModule,
        SequelizeConfigModule,
        SharedModule,
    ],
    controllers: [
        CoreEnvironmentInformationController,
        CoreGetBase64FromFileController,
        CoreGetFallbackLangController,
        CoreGetLangsController,
        CoreGetSearchKeyLangController,
        CorePreparationRequestController,
        CoreStatusController,
    ],
    providers: [
        BootstrapService,
        CoreGetBase64FromFileHandler,
        CoreGetBase64FromFileResolver,
        CoreGetFallbackLangHandler,
        CoreGetFallbackLangResolver,
        CoreGetLangsHandler,
        CoreGetLangsResolver,
        CoreGetSearchKeyLangHandler,
        CoreGetSearchKeyLangResolver,
    ],
})
export class CoreModule {}