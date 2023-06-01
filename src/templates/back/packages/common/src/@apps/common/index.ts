import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas, CommonCountryI18nModel, ICountryI18nRepository, SequelizeCountryI18nRepository } from './country';
import { CommonAdministrativeAreaLevel1Handlers, CommonAdministrativeAreaLevel1Services, CommonAdministrativeAreaLevel1Model, IAdministrativeAreaLevel1Repository, SequelizeAdministrativeAreaLevel1Repository, AdministrativeAreaLevel1Sagas } from './administrative-area-level-1';
import { CommonAdministrativeAreaLevel2Handlers, CommonAdministrativeAreaLevel2Services, CommonAdministrativeAreaLevel2Model, IAdministrativeAreaLevel2Repository, SequelizeAdministrativeAreaLevel2Repository, AdministrativeAreaLevel2Sagas } from './administrative-area-level-2';
import { CommonAdministrativeAreaLevel3Handlers, CommonAdministrativeAreaLevel3Services, CommonAdministrativeAreaLevel3Model, IAdministrativeAreaLevel3Repository, SequelizeAdministrativeAreaLevel3Repository, AdministrativeAreaLevel3Sagas } from './administrative-area-level-3';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers,
    ...CommonAdministrativeAreaLevel1Handlers,
    ...CommonAdministrativeAreaLevel2Handlers,
    ...CommonAdministrativeAreaLevel3Handlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices,
    ...CommonAdministrativeAreaLevel1Services,
    ...CommonAdministrativeAreaLevel2Services,
    ...CommonAdministrativeAreaLevel3Services
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18nModel,
    CommonAdministrativeAreaLevel1Model,
    CommonAdministrativeAreaLevel2Model,
    CommonAdministrativeAreaLevel3Model
];
export const CommonRepositories = [
    {
        provide : ILangRepository,
        useClass: SequelizeLangRepository
    },
    {
        provide : ICountryRepository,
        useClass: SequelizeCountryRepository
    },
    {
        provide : ICountryI18nRepository,
        useClass: SequelizeCountryI18nRepository
    },
    {
        provide : IAdministrativeAreaLevel1Repository,
        useClass: SequelizeAdministrativeAreaLevel1Repository
    },
    {
        provide : IAdministrativeAreaLevel2Repository,
        useClass: SequelizeAdministrativeAreaLevel2Repository
    },
    {
        provide : IAdministrativeAreaLevel3Repository,
        useClass: SequelizeAdministrativeAreaLevel3Repository
    }
];
export const CommonSagas = [
    LangSagas,
    CountrySagas,
    AdministrativeAreaLevel1Sagas,
    AdministrativeAreaLevel2Sagas,
    AdministrativeAreaLevel3Sagas
];
