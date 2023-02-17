import { AuditingSideEffectHandlers, AuditingSideEffectServices, AuditingSideEffectModel, ISideEffectRepository, SequelizeSideEffectRepository, SideEffectSagas } from './side-effect';
import { AuditingHttpCommunicationHandlers, AuditingHttpCommunicationServices, AuditingHttpCommunicationModel, IHttpCommunicationRepository, SequelizeHttpCommunicationRepository, HttpCommunicationSagas } from './http-communication';

export const AuditingHandlers = [
    ...AuditingSideEffectHandlers,
    ...AuditingHttpCommunicationHandlers
];
export const AuditingServices = [
    ...AuditingSideEffectServices,
    ...AuditingHttpCommunicationServices
];
export const AuditingModels = [
    AuditingSideEffectModel,
    AuditingHttpCommunicationModel
];
export const AuditingRepositories = [
    {
        provide : ISideEffectRepository,
        useClass: SequelizeSideEffectRepository
    },
    {
        provide : IHttpCommunicationRepository,
        useClass: SequelizeHttpCommunicationRepository
    }
];
export const AuditingSagas = [
    SideEffectSagas,
    HttpCommunicationSagas
];
