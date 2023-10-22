import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingHttpCommunicationResponse } from '../../domain/auditing-http-communication.response';
import { AuditingHttpCommunicationMapper } from '../../domain/auditing-http-communication.mapper';
import { AuditingRawSQLHttpCommunicationsQuery } from './auditing-raw-sql-http-communications.query';
import { AuditingRawSQLHttpCommunicationsService } from './auditing-raw-sql-http-communications.service';

@QueryHandler(AuditingRawSQLHttpCommunicationsQuery)
export class AuditingRawSQLHttpCommunicationsQueryHandler implements IQueryHandler<AuditingRawSQLHttpCommunicationsQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        private readonly rawSQLHttpCommunicationsService: AuditingRawSQLHttpCommunicationsService,
    ) {}

    async execute(query: AuditingRawSQLHttpCommunicationsQuery): Promise<AuditingHttpCommunicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLHttpCommunicationsService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
