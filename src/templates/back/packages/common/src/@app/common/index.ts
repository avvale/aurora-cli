import {
  CommonAdministrativeAreaLevel1Handlers,
  CommonAdministrativeAreaLevel1Model,
  CommonAdministrativeAreaLevel1Sagas,
  CommonAdministrativeAreaLevel1Services,
  CommonIAdministrativeAreaLevel1Repository,
  CommonSequelizeAdministrativeAreaLevel1Repository,
} from './administrative-area-level-1';
import {
  CommonAdministrativeAreaLevel2Handlers,
  CommonAdministrativeAreaLevel2Model,
  CommonAdministrativeAreaLevel2Sagas,
  CommonAdministrativeAreaLevel2Services,
  CommonIAdministrativeAreaLevel2Repository,
  CommonSequelizeAdministrativeAreaLevel2Repository,
} from './administrative-area-level-2';
import {
  CommonAdministrativeAreaLevel3Handlers,
  CommonAdministrativeAreaLevel3Model,
  CommonAdministrativeAreaLevel3Sagas,
  CommonAdministrativeAreaLevel3Services,
  CommonIAdministrativeAreaLevel3Repository,
  CommonSequelizeAdministrativeAreaLevel3Repository,
} from './administrative-area-level-3';
import {
  CommonAttachmentHandlers,
  CommonAttachmentModel,
  CommonAttachmentSagas,
  CommonAttachmentServices,
  CommonIAttachmentRepository,
  CommonSequelizeAttachmentRepository,
} from './attachment';
import {
  CommonAttachmentFamilyHandlers,
  CommonAttachmentFamilyModel,
  CommonAttachmentFamilySagas,
  CommonAttachmentFamilyServices,
  CommonIAttachmentFamilyRepository,
  CommonSequelizeAttachmentFamilyRepository,
} from './attachment-family';
import {
  CommonAttachmentLibraryHandlers,
  CommonAttachmentLibraryModel,
  CommonAttachmentLibrarySagas,
  CommonAttachmentLibraryServices,
  CommonIAttachmentLibraryRepository,
  CommonSequelizeAttachmentLibraryRepository,
} from './attachment-library';
import {
  CommonCountryHandlers,
  CommonCountryI18nModel,
  CommonCountryModel,
  CommonCountrySagas,
  CommonCountryServices,
  CommonICountryI18nRepository,
  CommonICountryRepository,
  CommonSequelizeCountryI18nRepository,
  CommonSequelizeCountryRepository,
} from './country';
import {
  CommonILangRepository,
  CommonLangHandlers,
  CommonLangModel,
  CommonLangSagas,
  CommonLangServices,
  CommonSequelizeLangRepository,
} from './lang';
import {
  CommonIResourceRepository,
  CommonResourceHandlers,
  CommonResourceModel,
  CommonResourceSagas,
  CommonResourceServices,
  CommonSequelizeResourceRepository,
} from './resource';

export const CommonHandlers = [
  ...CommonLangHandlers,
  ...CommonCountryHandlers,
  ...CommonAdministrativeAreaLevel1Handlers,
  ...CommonAdministrativeAreaLevel2Handlers,
  ...CommonAdministrativeAreaLevel3Handlers,
  ...CommonResourceHandlers,
  ...CommonAttachmentFamilyHandlers,
  ...CommonAttachmentLibraryHandlers,
  ...CommonAttachmentHandlers,
];
export const CommonServices = [
  ...CommonLangServices,
  ...CommonCountryServices,
  ...CommonAdministrativeAreaLevel1Services,
  ...CommonAdministrativeAreaLevel2Services,
  ...CommonAdministrativeAreaLevel3Services,
  ...CommonResourceServices,
  ...CommonAttachmentFamilyServices,
  ...CommonAttachmentLibraryServices,
  ...CommonAttachmentServices,
];
export const CommonModels = [
  CommonLangModel,
  CommonCountryModel,
  CommonCountryI18nModel,
  CommonAdministrativeAreaLevel1Model,
  CommonAdministrativeAreaLevel2Model,
  CommonAdministrativeAreaLevel3Model,
  CommonResourceModel,
  CommonAttachmentFamilyModel,
  CommonAttachmentLibraryModel,
  CommonAttachmentModel,
];
export const CommonRepositories = [
  {
    provide: CommonILangRepository,
    useClass: CommonSequelizeLangRepository,
  },
  {
    provide: CommonICountryI18nRepository,
    useClass: CommonSequelizeCountryI18nRepository,
  },
  {
    provide: CommonICountryRepository,
    useClass: CommonSequelizeCountryRepository,
  },
  {
    provide: CommonIAdministrativeAreaLevel1Repository,
    useClass: CommonSequelizeAdministrativeAreaLevel1Repository,
  },
  {
    provide: CommonIAdministrativeAreaLevel2Repository,
    useClass: CommonSequelizeAdministrativeAreaLevel2Repository,
  },
  {
    provide: CommonIAdministrativeAreaLevel3Repository,
    useClass: CommonSequelizeAdministrativeAreaLevel3Repository,
  },
  {
    provide: CommonIResourceRepository,
    useClass: CommonSequelizeResourceRepository,
  },
  {
    provide: CommonIAttachmentFamilyRepository,
    useClass: CommonSequelizeAttachmentFamilyRepository,
  },
  {
    provide: CommonIAttachmentLibraryRepository,
    useClass: CommonSequelizeAttachmentLibraryRepository,
  },
  {
    provide: CommonIAttachmentRepository,
    useClass: CommonSequelizeAttachmentRepository,
  },
];
export const CommonSagas = [
  CommonCountrySagas,
  CommonLangSagas,
  CommonAdministrativeAreaLevel1Sagas,
  CommonAdministrativeAreaLevel2Sagas,
  CommonAdministrativeAreaLevel3Sagas,
  CommonResourceSagas,
  CommonAttachmentFamilySagas,
  CommonAttachmentLibrarySagas,
  CommonAttachmentSagas,
];
