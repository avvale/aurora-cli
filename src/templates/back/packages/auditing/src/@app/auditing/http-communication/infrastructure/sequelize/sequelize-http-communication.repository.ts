import { AuditingRunner, ICriteria, LiteralObject, SequelizeRepository } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AuditingHttpCommunication } from '../../domain/http-communication.aggregate';
import { HttpCommunicationMapper } from '../../domain/http-communication.mapper';
import { IHttpCommunicationRepository } from '../../domain/http-communication.repository';
import { AuditingHttpCommunicationModel } from './sequelize-http-communication.model';

@Injectable()
export class SequelizeHttpCommunicationRepository extends SequelizeRepository<AuditingHttpCommunication, AuditingHttpCommunicationModel> implements IHttpCommunicationRepository
{
    public readonly aggregateName: string = 'AuditingHttpCommunication';
    public readonly mapper: HttpCommunicationMapper = new HttpCommunicationMapper();

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