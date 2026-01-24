/* eslint-disable comma-dangle */
import {
  AuditingHttpCommunicationHandlers,
  AuditingHttpCommunicationModel,
  AuditingHttpCommunicationSagas,
  AuditingHttpCommunicationServices,
  AuditingIHttpCommunicationRepository,
  AuditingSequelizeHttpCommunicationRepository,
} from './http-communication';
import {
  AuditingISideEffectRepository,
  AuditingSequelizeSideEffectRepository,
  AuditingSideEffectHandlers,
  AuditingSideEffectModel,
  AuditingSideEffectSagas,
  AuditingSideEffectServices,
} from './side-effect';

export const AuditingHandlers = [
  ...AuditingHttpCommunicationHandlers,
  ...AuditingSideEffectHandlers,
];
export const AuditingServices = [
  ...AuditingHttpCommunicationServices,
  ...AuditingSideEffectServices,
];
export const AuditingModels = [
  AuditingHttpCommunicationModel,
  AuditingSideEffectModel,
];
export const AuditingRepositories = [
  {
    provide: AuditingIHttpCommunicationRepository,
    useClass: AuditingSequelizeHttpCommunicationRepository,
  },
  {
    provide: AuditingISideEffectRepository,
    useClass: AuditingSequelizeSideEffectRepository,
  },
];
export const AuditingSagas = [
  AuditingHttpCommunicationSagas,
  AuditingSideEffectSagas,
];
