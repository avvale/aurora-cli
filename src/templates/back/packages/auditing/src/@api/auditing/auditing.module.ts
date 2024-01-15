import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { AuditingSeeder } from './auditing.seeder';
import { AuditingModels, AuditingHandlers, AuditingServices, AuditingRepositories, AuditingSagas } from '@app/auditing';
import { AuditingSideEffectApiHandlers, AuditingSideEffectApiControllers, AuditingSideEffectApiResolvers, AuditingSideEffectApiServices } from './side-effect';
import { AuditingHttpCommunicationApiHandlers, AuditingHttpCommunicationApiControllers, AuditingHttpCommunicationApiResolvers, AuditingHttpCommunicationApiServices } from './http-communication';
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
        ...AuditingSideEffectApiControllers,
        ...AuditingHttpCommunicationApiControllers,
    ],
    providers: [
        AuditingDeleteHttpCommunicationTasksService,
        AuditingDeleteSideEffectTasksService,
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
