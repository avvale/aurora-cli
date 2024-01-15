import { AuditingHttpCommunicationMapper, AuditingHttpCommunicationResponse, AuditingRawSQLHttpCommunicationsQuery } from '@app/auditing/http-communication';
import { AuditingRawSQLHttpCommunicationsService } from '@app/auditing/http-communication/application/raw-sql/auditing-raw-sql-http-communications.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

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
