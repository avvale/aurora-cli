import {
  CommonHandlers,
  CommonModels,
  CommonRepositories,
  CommonSagas,
  CommonServices,
} from '@app/common';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  CommonAdministrativeAreaLevel1ApiControllers,
  CommonAdministrativeAreaLevel1ApiHandlers,
  CommonAdministrativeAreaLevel1ApiResolvers,
  CommonAdministrativeAreaLevel1ApiServices,
} from './administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel2ApiControllers,
  CommonAdministrativeAreaLevel2ApiHandlers,
  CommonAdministrativeAreaLevel2ApiResolvers,
  CommonAdministrativeAreaLevel2ApiServices,
} from './administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel3ApiControllers,
  CommonAdministrativeAreaLevel3ApiHandlers,
  CommonAdministrativeAreaLevel3ApiResolvers,
  CommonAdministrativeAreaLevel3ApiServices,
} from './administrative-area-level-3';
import {
  CommonAttachmentApiControllers,
  CommonAttachmentApiHandlers,
  CommonAttachmentApiResolvers,
  CommonAttachmentApiServices,
} from './attachment';
import {
  CommonAttachmentFamilyApiControllers,
  CommonAttachmentFamilyApiHandlers,
  CommonAttachmentFamilyApiResolvers,
  CommonAttachmentFamilyApiServices,
} from './attachment-family';
import {
  CommonAttachmentLibraryApiControllers,
  CommonAttachmentLibraryApiHandlers,
  CommonAttachmentLibraryApiResolvers,
  CommonAttachmentLibraryApiServices,
} from './attachment-library';
import { CommonSeeder } from './common.seeder';
import {
  CommonCountryApiControllers,
  CommonCountryApiHandlers,
  CommonCountryApiResolvers,
  CommonCountryApiServices,
} from './country';
import {
  CommonCropApiControllers,
  CommonCropApiHandlers,
  CommonCropApiResolvers,
} from './crop';
import {
  CommonLangApiControllers,
  CommonLangApiHandlers,
  CommonLangApiResolvers,
  CommonLangApiServices,
} from './lang';
import {
  CommonResourceApiControllers,
  CommonResourceApiHandlers,
  CommonResourceApiResolvers,
  CommonResourceApiServices,
} from './resource';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...CommonModels])],
  controllers: [
    ...CommonLangApiControllers,
    ...CommonResourceApiControllers,
    ...CommonCountryApiControllers,
    ...CommonAdministrativeAreaLevel1ApiControllers,
    ...CommonAdministrativeAreaLevel2ApiControllers,
    ...CommonAdministrativeAreaLevel3ApiControllers,
    ...CommonAttachmentFamilyApiControllers,
    ...CommonAttachmentLibraryApiControllers,
    ...CommonAttachmentApiControllers,
    ...CommonCropApiControllers,
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
    ...CommonAttachmentApiServices,
    ...CommonCropApiResolvers,
    ...CommonCropApiHandlers,
  ],
})
export class CommonModule {}
