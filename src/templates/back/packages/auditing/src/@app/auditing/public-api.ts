/* eslint-disable comma-dangle */
import { AuditingHttpCommunicationHandlers, AuditingHttpCommunicationServices, AuditingHttpCommunicationModel, AuditingIHttpCommunicationRepository, AuditingSequelizeHttpCommunicationRepository, AuditingHttpCommunicationSagas } from './http-communication';
import { AuditingSideEffectHandlers, AuditingSideEffectServices, AuditingSideEffectModel, AuditingISideEffectRepository, AuditingSequelizeSideEffectRepository, AuditingSideEffectSagas } from './side-effect';

export const AuditingHandlers = [
    ...AuditingHttpCommunicationHandlers,
    ...AuditingSideEffectHandlers
];
export const AuditingServices = [
    ...AuditingHttpCommunicationServices,
    ...AuditingSideEffectServices
];
export const AuditingModels = [
    AuditingHttpCommunicationModel,
    AuditingSideEffectModel
];
export const AuditingRepositories = [
    {
        provide : AuditingIHttpCommunicationRepository,
        useClass: AuditingSequelizeHttpCommunicationRepository,
    },
    {
        provide : AuditingISideEffectRepository,
        useClass: AuditingSequelizeSideEffectRepository,
    }
];
export const AuditingSagas = [
    AuditingHttpCommunicationSagas,
    AuditingSideEffectSagas
];
