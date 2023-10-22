import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingHttpCommunicationResponse } from '../../domain/auditing-http-communication.response';
import { AuditingHttpCommunicationMapper } from '../../domain/auditing-http-communication.mapper';
import { AuditingHttpCommunicationId } from '../../domain/value-objects';
import { AuditingFindHttpCommunicationByIdQuery } from './auditing-find-http-communication-by-id.query';
import { AuditingFindHttpCommunicationByIdService } from './auditing-find-http-communication-by-id.service';

@QueryHandler(AuditingFindHttpCommunicationByIdQuery)
export class AuditingFindHttpCommunicationByIdQueryHandler implements IQueryHandler<AuditingFindHttpCommunicationByIdQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationByIdService: AuditingFindHttpCommunicationByIdService,
    ) {}

    async execute(query: AuditingFindHttpCommunicationByIdQuery): Promise<AuditingHttpCommunicationResponse>
    {
        const httpCommunication = await this.findHttpCommunicationByIdService.main(
            new AuditingHttpCommunicationId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}
