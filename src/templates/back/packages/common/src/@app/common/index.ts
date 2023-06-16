import { CommonLangHandlers, CommonLangServices, CommonLangModel, CommonILangRepository, CommonSequelizeLangRepository, CommonLangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, CommonCountryI18nModel, CommonICountryRepository, CommonSequelizeCountryRepository, CommonICountryI18nRepository, CommonSequelizeCountryI18nRepository, CommonCountrySagas } from './country';

export const CommonHandlers = [
    ...CommonLangHandlers,
    ...CommonCountryHandlers
];
export const CommonServices = [
    ...CommonLangServices,
    ...CommonCountryServices
];
export const CommonModels = [
    CommonLangModel,
    CommonCountryModel,
    CommonCountryI18nModel
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
    }
];
export const CommonSagas = [
    CommonCountrySagas,
    CommonLangSagas
];

