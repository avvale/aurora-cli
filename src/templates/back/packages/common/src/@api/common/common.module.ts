import { CommonHandlers, CommonModels, CommonRepositories, CommonSagas, CommonServices } from '@app/common';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonSeeder } from './common.seeder';
import { CommonCountryApiHandlers, CommonCountryControllers, CommonCountryResolvers, CommonCountryServices } from './country';
import { CommonLangApiHandlers, CommonLangControllers, CommonLangResolvers, CommonLangServices } from './lang';
import { CommonAdministrativeAreaLevel1Controllers, CommonAdministrativeAreaLevel1Resolvers, CommonAdministrativeAreaLevel1ApiHandlers, CommonAdministrativeAreaLevel1Services } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Controllers, CommonAdministrativeAreaLevel2Resolvers, CommonAdministrativeAreaLevel2ApiHandlers, CommonAdministrativeAreaLevel2Services } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Controllers, CommonAdministrativeAreaLevel3Resolvers, CommonAdministrativeAreaLevel3ApiHandlers, CommonAdministrativeAreaLevel3Services } from './administrative-area-level-3';
import { CommonResourceControllers, CommonResourceResolvers, CommonResourceApiHandlers, CommonResourceServices } from './resource';
import { CommonAttachmentFamilyControllers, CommonAttachmentFamilyResolvers, CommonAttachmentFamilyApiHandlers, CommonAttachmentFamilyServices } from './attachment-family';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CommonModels
        ])
    ],
    controllers: [
        ...CommonLangControllers,
        ...CommonCountryControllers,
        ...CommonAdministrativeAreaLevel1Controllers,
        ...CommonAdministrativeAreaLevel2Controllers,
        ...CommonAdministrativeAreaLevel3Controllers,
        ...CommonResourceControllers,
        ...CommonAttachmentFamilyControllers
    ],
    providers: [
        CommonSeeder,
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangResolvers,
        ...CommonLangApiHandlers,
        ...CommonLangServices,
        ...CommonCountryResolvers,
        ...CommonCountryApiHandlers,
        ...CommonCountryServices,
        ...CommonAdministrativeAreaLevel1Resolvers,
        ...CommonAdministrativeAreaLevel1ApiHandlers,
        ...CommonAdministrativeAreaLevel1Services,
        ...CommonAdministrativeAreaLevel2Resolvers,
        ...CommonAdministrativeAreaLevel2ApiHandlers,
        ...CommonAdministrativeAreaLevel2Services,
        ...CommonAdministrativeAreaLevel3Resolvers,
        ...CommonAdministrativeAreaLevel3ApiHandlers,
        ...CommonAdministrativeAreaLevel3Services,
        ...CommonResourceResolvers,
        ...CommonResourceApiHandlers,
        ...CommonResourceServices,
        ...CommonAttachmentFamilyResolvers,
        ...CommonAttachmentFamilyApiHandlers,
        ...CommonAttachmentFamilyServices
    ],
})
export class CommonModule {}
