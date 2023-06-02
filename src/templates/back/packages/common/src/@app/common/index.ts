import { CommonLangHandlers, CommonLangServices, CommonLangModel, ILangRepository, SequelizeLangRepository, LangSagas } from './lang';

export const CommonHandlers = [
    ...CommonLangHandlers,
];
export const CommonServices = [
    ...CommonLangServices,
];
export const CommonModels = [
    CommonLangModel,
];
export const CommonRepositories = [
    {
        provide : ILangRepository,
        useClass: SequelizeLangRepository
    },
];
export const CommonSagas = [
    LangSagas,
];
