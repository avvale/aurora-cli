import {
    AuditingFindHttpCommunicationByIdQuery,
    AuditingHttpCommunicationMapper,
    AuditingHttpCommunicationResponse,
} from '@app/auditing/http-communication';
import { AuditingFindHttpCommunicationByIdService } from '@app/auditing/http-communication/application/find/auditing-find-http-communication-by-id.service';
import { AuditingHttpCommunicationId } from '@app/auditing/http-communication/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingFindHttpCommunicationByIdQuery)
export class AuditingFindHttpCommunicationByIdQueryHandler
    implements IQueryHandler<AuditingFindHttpCommunicationByIdQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper =
        new AuditingHttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationByIdService: AuditingFindHttpCommunicationByIdService,
    ) {}

    async execute(
        query: AuditingFindHttpCommunicationByIdQuery,
    ): Promise<AuditingHttpCommunicationResponse> {
        const httpCommunication =
            await this.findHttpCommunicationByIdService.main(
                new AuditingHttpCommunicationId(query.id),
                query.constraint,
                query.cQMetadata,
            );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}
