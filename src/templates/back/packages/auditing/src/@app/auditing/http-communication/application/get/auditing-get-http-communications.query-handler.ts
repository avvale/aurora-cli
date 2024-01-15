import { AuditingGetHttpCommunicationsQuery, AuditingHttpCommunicationMapper, AuditingHttpCommunicationResponse } from '@app/auditing/http-communication';
import { AuditingGetHttpCommunicationsService } from '@app/auditing/http-communication/application/get/auditing-get-http-communications.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingGetHttpCommunicationsQuery)
export class AuditingGetHttpCommunicationsQueryHandler implements IQueryHandler<AuditingGetHttpCommunicationsQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        private readonly getHttpCommunicationsService: AuditingGetHttpCommunicationsService,
    ) {}

    async execute(query: AuditingGetHttpCommunicationsQuery): Promise<AuditingHttpCommunicationResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getHttpCommunicationsService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}
