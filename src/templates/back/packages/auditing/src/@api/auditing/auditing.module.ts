import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SharedModule } from '@aurora/shared.module';
import { AuditingModels, AuditingHandlers, AuditingServices, AuditingRepositories, AuditingSagas } from '@app/auditing';
import { AuditingSideEffectControllers, AuditingSideEffectResolvers, AuditingSideEffectApiHandlers, AuditingSideEffectServices } from './side-effect';
import { AuditingHttpCommunicationControllers, AuditingHttpCommunicationResolvers, AuditingHttpCommunicationApiHandlers, AuditingHttpCommunicationServices } from './http-communication';

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
