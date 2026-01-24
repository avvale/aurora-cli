import {
  AuditingHandlers,
  AuditingModels,
  AuditingRepositories,
  AuditingSagas,
  AuditingServices,
} from '@app/auditing';
import { SharedModule } from '@aurora/shared.module';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuditingSeeder } from './auditing.seeder';
import {
  AuditingHttpCommunicationApiControllers,
  AuditingHttpCommunicationApiHandlers,
  AuditingHttpCommunicationApiResolvers,
  AuditingHttpCommunicationApiServices,
} from './http-communication';
import {
  AuditingDeleteHttpCommunicationTask,
  AuditingDeleteSideEffectTask,
} from './shared';
import {
  AuditingSideEffectApiControllers,
  AuditingSideEffectApiHandlers,
  AuditingSideEffectApiResolvers,
  AuditingSideEffectApiServices,
} from './side-effect';

@Module({
  imports: [SharedModule, SequelizeModule.forFeature([...AuditingModels])],
  controllers: [
    ...AuditingSideEffectApiControllers,
    ...AuditingHttpCommunicationApiControllers,
  ],
  providers: [
    // Tasks
    AuditingDeleteHttpCommunicationTask,
    AuditingDeleteSideEffectTask,

    AuditingSeeder,
    ...AuditingHandlers,
    ...AuditingServices,
    ...AuditingRepositories,
    ...AuditingSagas,
    ...AuditingSideEffectApiHandlers,
    ...AuditingHttpCommunicationApiHandlers,
    ...AuditingSideEffectApiResolvers,
    ...AuditingSideEffectApiServices,
    ...AuditingHttpCommunicationApiResolvers,
    ...AuditingHttpCommunicationApiServices,
  ],
})
export class AuditingModule {}
