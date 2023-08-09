import { CommonLangHandlers, CommonLangServices, CommonLangModel, CommonILangRepository, CommonSequelizeLangRepository, CommonLangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, CommonCountryI18nModel, CommonICountryRepository, CommonSequelizeCountryRepository, CommonICountryI18nRepository, CommonSequelizeCountryI18nRepository, CommonCountrySagas } from './country';
import { CommonAdministrativeAreaLevel1Handlers, CommonAdministrativeAreaLevel1Services, CommonAdministrativeAreaLevel1Model, CommonIAdministrativeAreaLevel1Repository, CommonSequelizeAdministrativeAreaLevel1Repository, CommonAdministrativeAreaLevel1Sagas } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Handlers, CommonAdministrativeAreaLevel2Services, CommonAdministrativeAreaLevel2Model, CommonIAdministrativeAreaLevel2Repository, CommonSequelizeAdministrativeAreaLevel2Repository, CommonAdministrativeAreaLevel2Sagas } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Handlers, CommonAdministrativeAreaLevel3Services, CommonAdministrativeAreaLevel3Model, CommonIAdministrativeAreaLevel3Repository, CommonSequelizeAdministrativeAreaLevel3Repository, CommonAdministrativeAreaLevel3Sagas } from './administrative-area-level-3';
import { CommonResourceHandlers, CommonResourceServices, CommonResourceModel, CommonIResourceRepository, CommonSequelizeResourceRepository, CommonResourceSagas } from './resource';
import { CommonAttachmentFamilyHandlers, CommonAttachmentFamilyServices, CommonAttachmentFamilyModel, CommonIAttachmentFamilyRepository, CommonSequelizeAttachmentFamilyRepository, CommonAttachmentFamilySagas } from './attachment-family';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers,
    ...CommonAdministrativeAreaLevel1Handlers,
    ...CommonAdministrativeAreaLevel2Handlers,
    ...CommonAdministrativeAreaLevel3Handlers,
    ...CommonResourceHandlers,
    ...CommonAttachmentFamilyHandlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices,
    ...CommonAdministrativeAreaLevel1Services,
    ...CommonAdministrativeAreaLevel2Services,
    ...CommonAdministrativeAreaLevel3Services,
    ...CommonResourceServices,
    ...CommonAttachmentFamilyServices
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18nModel,
    CommonAdministrativeAreaLevel1Model,
    CommonAdministrativeAreaLevel2Model,
    CommonAdministrativeAreaLevel3Model,
    CommonResourceModel,
    CommonAttachmentFamilyModel
];
export const CommonRepositories = [
    {
        provide : CommonILangRepository,
        useClass: CommonSequelizeLangRepository
    },
    {
        provide : CommonICountryI18nRepository,
        useClass: CommonSequelizeCountryI18nRepository
    },
    {
        provide : CommonICountryRepository,
        useClass: CommonSequelizeCountryRepository
    },
    {
        provide : CommonIAdministrativeAreaLevel1Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel1Repository
    },
    {
        provide : CommonIAdministrativeAreaLevel2Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel2Repository
    },
    {
        provide : CommonIAdministrativeAreaLevel3Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel3Repository
    },
    {
        provide : CommonIResourceRepository,
        useClass: CommonSequelizeResourceRepository
    },
    {
        provide : CommonIAttachmentFamilyRepository,
        useClass: CommonSequelizeAttachmentFamilyRepository
    }
];
export const CommonSagas = [
    CommonCountrySagas,
    CommonLangSagas,
    CommonAdministrativeAreaLevel1Sagas,
    CommonAdministrativeAreaLevel2Sagas,
    CommonAdministrativeAreaLevel3Sagas,
    CommonResourceSagas,
    CommonAttachmentFamilySagas
];

