import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { AuditingSeeder } from './auditing.seeder';
import { AuditingModels, AuditingHandlers, AuditingServices, AuditingRepositories, AuditingSagas } from '@app/auditing';
import { AuditingSideEffectControllers, AuditingSideEffectResolvers, AuditingSideEffectApiHandlers, AuditingSideEffectServices } from './side-effect';
import { AuditingHttpCommunicationControllers, AuditingHttpCommunicationResolvers, AuditingHttpCommunicationApiHandlers, AuditingHttpCommunicationServices } from './http-communication';
import { AuditingDeleteSideEffectTasksService } from './shared/tasks/auditing-delete-side-effect.task';
import { AuditingDeleteHttpCommunicationTasksService } from './shared/tasks/auditing-delete-http-communication.task';

@Module({
    imports: [
        SharedModule,
        SequelizeModule.forFeature([
            ...AuditingModels,
        ]),
    ],
    controllers: [
        ...AuditingSideEffectControllers,
        ...AuditingHttpCommunicationControllers,
    ],
    providers: [
        AuditingDeleteHttpCommunicationTasksService,
        AuditingDeleteSideEffectTasksService,
        AuditingSeeder,
        ...AuditingHandlers,
        ...AuditingServices,
        ...AuditingRepositories,
        ...AuditingSagas,
        ...AuditingSideEffectResolvers,
        ...AuditingSideEffectApiHandlers,
        ...AuditingHttpCommunicationResolvers,
        ...AuditingHttpCommunicationApiHandlers,
        ...AuditingSideEffectServices,
        ...AuditingHttpCommunicationServices,
    ],
})
export class AuditingModule {}
