import {
    AuditingFindHttpCommunicationQuery,
    AuditingHttpCommunicationMapper,
    AuditingHttpCommunicationResponse,
} from '@app/auditing/http-communication';
import { AuditingFindHttpCommunicationService } from '@app/auditing/http-communication/application/find/auditing-find-http-communication.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingFindHttpCommunicationQuery)
export class AuditingFindHttpCommunicationQueryHandler
    implements IQueryHandler<AuditingFindHttpCommunicationQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper =
        new AuditingHttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationService: AuditingFindHttpCommunicationService,
    ) {}

    async execute(
        query: AuditingFindHttpCommunicationQuery,
    ): Promise<AuditingHttpCommunicationResponse> {
        const httpCommunication = await this.findHttpCommunicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}
