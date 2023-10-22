import { AuditingSideEffectHandlers, AuditingSideEffectServices, AuditingSideEffectModel, AuditingISideEffectRepository, AuditingSequelizeSideEffectRepository, AuditingSideEffectSagas } from './side-effect';
import { AuditingHttpCommunicationHandlers, AuditingHttpCommunicationServices, AuditingHttpCommunicationModel,  AuditingIHttpCommunicationRepository, AuditingSequelizeHttpCommunicationRepository, AuditingHttpCommunicationSagas } from './http-communication';

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
        provide : AuditingIHttpCommunicationRepository,
        useClass: AuditingSequelizeHttpCommunicationRepository
    },
    {
        provide : AuditingISideEffectRepository,
        useClass: AuditingSequelizeSideEffectRepository
    }
];
export const AuditingSagas = [
    AuditingHttpCommunicationSagas,
    AuditingSideEffectSagas
];
