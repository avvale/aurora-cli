import { CommonResourceHandlers, CommonResourceServices, CommonResourceModel, CommonIResourceRepository, CommonSequelizeResourceRepository, CommonResourceSagas } from './resource';
import { CommonLangHandlers, CommonLangServices, CommonLangModel, CommonILangRepository, CommonSequelizeLangRepository, CommonLangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, CommonICountryRepository, CommonSequelizeCountryRepository, CommonCountrySagas, CommonCountryI18nModel, CommonICountryI18nRepository, CommonSequelizeCountryI18nRepository } from './country';
import { CommonAdministrativeAreaLevel1Handlers, CommonAdministrativeAreaLevel1Services, CommonAdministrativeAreaLevel1Model, CommonIAdministrativeAreaLevel1Repository, CommonSequelizeAdministrativeAreaLevel1Repository, CommonAdministrativeAreaLevel1Sagas } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Handlers, CommonAdministrativeAreaLevel2Services, CommonAdministrativeAreaLevel2Model, CommonIAdministrativeAreaLevel2Repository, CommonSequelizeAdministrativeAreaLevel2Repository, CommonAdministrativeAreaLevel2Sagas } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Handlers, CommonAdministrativeAreaLevel3Services, CommonAdministrativeAreaLevel3Model, CommonIAdministrativeAreaLevel3Repository, CommonSequelizeAdministrativeAreaLevel3Repository, CommonAdministrativeAreaLevel3Sagas } from './administrative-area-level-3';

/**
 * @aurora-generated
 * @source cliter/common
 */
export const CommonHandlers = [
    ...CommonResourceHandlers,
    ...CommonLangHandlers,
    ...CommonCountryHandlers,
    ...CommonAdministrativeAreaLevel1Handlers,
    ...CommonAdministrativeAreaLevel2Handlers,
    ...CommonAdministrativeAreaLevel3Handlers
];
export const CommonServices = [
    ...CommonResourceServices,
    ...CommonLangServices,
    ...CommonCountryServices,
    ...CommonAdministrativeAreaLevel1Services,
    ...CommonAdministrativeAreaLevel2Services,
    ...CommonAdministrativeAreaLevel3Services
];
export const CommonModels = [
    CommonResourceModel,
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18nModel,
    CommonAdministrativeAreaLevel1Model,
    CommonAdministrativeAreaLevel2Model,
    CommonAdministrativeAreaLevel3Model
];
export const CommonRepositories = [
    {
        provide : CommonIResourceRepository,
        useClass: CommonSequelizeResourceRepository,
    },
    {
        provide : CommonILangRepository,
        useClass: CommonSequelizeLangRepository,
    },
    {
        provide : CommonICountryRepository,
        useClass: CommonSequelizeCountryRepository,
    },
    {
        provide : CommonICountryI18nRepository,
        useClass: CommonSequelizeCountryI18nRepository
    },
    {
        provide : CommonIAdministrativeAreaLevel1Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel1Repository,
    },
    {
        provide : CommonIAdministrativeAreaLevel2Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel2Repository,
    },
    {
        provide : CommonIAdministrativeAreaLevel3Repository,
        useClass: CommonSequelizeAdministrativeAreaLevel3Repository,
    }
];
export const CommonSagas = [
    CommonResourceSagas,
    CommonLangSagas,
    CommonCountrySagas,
    CommonAdministrativeAreaLevel1Sagas,
    CommonAdministrativeAreaLevel2Sagas,
    CommonAdministrativeAreaLevel3Sagas
];
