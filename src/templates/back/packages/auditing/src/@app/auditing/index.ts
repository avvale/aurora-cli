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
  ...AuditingSideEffectHandlers,
  ...AuditingHttpCommunicationHandlers,
];
export const AuditingServices = [
  ...AuditingSideEffectServices,
  ...AuditingHttpCommunicationServices,
];
export const AuditingModels = [
  AuditingSideEffectModel,
  AuditingHttpCommunicationModel,
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
