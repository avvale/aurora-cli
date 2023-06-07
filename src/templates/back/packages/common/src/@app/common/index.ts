import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';
import { CommonCountryHandlers, CommonCountryServices, CommonCountryModel, ICountryRepository, SequelizeCountryRepository, CountrySagas, CommonCountryI18nModel, ICountryI18nRepository, SequelizeCountryI18nRepository } from './country';

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
    }
];
export const CommonSagas = [
    LangSagas,
    CountrySagas
];
