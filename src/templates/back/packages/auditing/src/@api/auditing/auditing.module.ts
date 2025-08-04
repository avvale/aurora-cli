import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { AuditingSeeder } from './auditing.seeder';
import { AuditingModels, AuditingHandlers, AuditingServices, AuditingRepositories, AuditingSagas } from '@app/auditing';
import { AuditingSideEffectApiHandlers, AuditingSideEffectApiControllers, AuditingSideEffectApiResolvers, AuditingSideEffectApiServices } from './side-effect';
import { AuditingHttpCommunicationApiHandlers, AuditingHttpCommunicationApiControllers, AuditingHttpCommunicationApiResolvers, AuditingHttpCommunicationApiServices } from './http-communication';
import { AuditingDeleteHttpCommunicationTask, AuditingDeleteSideEffectTask } from './shared';

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
