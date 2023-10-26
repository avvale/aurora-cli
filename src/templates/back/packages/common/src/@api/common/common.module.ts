import { CommonHandlers, CommonModels, CommonRepositories, CommonSagas, CommonServices } from '@app/common';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommonSeeder } from './common.seeder';
import { CommonCountryApiHandlers, CommonCountryApiControllers, CommonCountryApiResolvers, CommonCountryApiServices } from './country';
import { CommonLangApiHandlers, CommonLangApiControllers, CommonLangApiResolvers, CommonLangApiServices } from './lang';
import { CommonAdministrativeAreaLevel1ApiHandlers, CommonAdministrativeAreaLevel1ApiControllers, CommonAdministrativeAreaLevel1ApiResolvers, CommonAdministrativeAreaLevel1ApiServices } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2ApiHandlers, CommonAdministrativeAreaLevel2ApiControllers, CommonAdministrativeAreaLevel2ApiResolvers, CommonAdministrativeAreaLevel2ApiServices } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3ApiHandlers, CommonAdministrativeAreaLevel3ApiControllers, CommonAdministrativeAreaLevel3ApiResolvers, CommonAdministrativeAreaLevel3ApiServices } from './administrative-area-level-3';
import { CommonResourceApiHandlers, CommonResourceApiControllers, CommonResourceApiResolvers, CommonResourceApiServices } from './resource';
import { CommonAttachmentFamilyApiHandlers, CommonAttachmentFamilyApiControllers, CommonAttachmentFamilyApiResolvers, CommonAttachmentFamilyApiServices } from './attachment-family';
import { CommonAttachmentLibraryApiControllers, CommonAttachmentLibraryApiResolvers, CommonAttachmentLibraryApiHandlers, CommonAttachmentLibraryApiServices } from './attachment-library';
import { CommonAttachmentApiControllers, CommonAttachmentApiResolvers, CommonAttachmentApiHandlers, CommonAttachmentApiServices } from './attachment';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...CommonModels,
        ]),
    ],
    controllers: [
        ...CommonLangApiControllers,
        ...CommonResourceApiControllers,
        ...CommonCountryApiControllers,
        ...CommonAdministrativeAreaLevel1ApiControllers,
        ...CommonAdministrativeAreaLevel2ApiControllers,
        ...CommonAdministrativeAreaLevel3ApiControllers,
        ...CommonAttachmentFamilyApiControllers,
        ...CommonAttachmentLibraryApiControllers,
        ...CommonAttachmentApiControllers
    ],
    providers: [
        CommonSeeder,
        ...CommonHandlers,
        ...CommonServices,
        ...CommonRepositories,
        ...CommonSagas,
        ...CommonLangApiHandlers,
        ...CommonCountryApiHandlers,
        ...CommonAdministrativeAreaLevel1ApiHandlers,
        ...CommonAdministrativeAreaLevel2ApiHandlers,
        ...CommonAdministrativeAreaLevel3ApiHandlers,
        ...CommonResourceApiHandlers,
        ...CommonAttachmentFamilyApiHandlers,
        ...CommonLangApiResolvers,
        ...CommonLangApiServices,
        ...CommonResourceApiResolvers,
        ...CommonResourceApiServices,
        ...CommonCountryApiResolvers,
        ...CommonCountryApiServices,
        ...CommonAdministrativeAreaLevel1ApiResolvers,
        ...CommonAdministrativeAreaLevel1ApiServices,
        ...CommonAdministrativeAreaLevel2ApiResolvers,
        ...CommonAdministrativeAreaLevel2ApiServices,
        ...CommonAdministrativeAreaLevel3ApiResolvers,
        ...CommonAdministrativeAreaLevel3ApiServices,
        ...CommonAttachmentFamilyApiResolvers,
        ...CommonAttachmentFamilyApiServices,
        ...CommonAttachmentLibraryApiResolvers,
        ...CommonAttachmentLibraryApiHandlers,
        ...CommonAttachmentLibraryApiServices,
        ...CommonAttachmentApiResolvers,
        ...CommonAttachmentApiHandlers,
        ...CommonAttachmentApiServices
    ],
})
export class CommonModule {}
