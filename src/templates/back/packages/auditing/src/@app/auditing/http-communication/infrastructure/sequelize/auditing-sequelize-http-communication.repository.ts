import { AuditingHttpCommunication, AuditingHttpCommunicationMapper, AuditingHttpCommunicationModel, AuditingIHttpCommunicationRepository } from '@app/auditing/http-communication';
import { AuditingRunner, ICriteria, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class AuditingSequelizeHttpCommunicationRepository extends SequelizeRepository<AuditingHttpCommunication, AuditingHttpCommunicationModel> implements AuditingIHttpCommunicationRepository
{
    public readonly aggregateName: string = 'AuditingHttpCommunication';
    public readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        @InjectModel(AuditingHttpCommunicationModel)
        public readonly repository: typeof AuditingHttpCommunicationModel,
        public readonly criteria: ICriteria,
        public readonly auditingRunner: AuditingRunner,
    )
    {
        super();
    }
}
