import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AuditingHttpCommunicationResponse } from '../../domain/auditing-http-communication.response';
import { AuditingHttpCommunicationMapper } from '../../domain/auditing-http-communication.mapper';
import { AuditingFindHttpCommunicationQuery } from './auditing-find-http-communication.query';
import { AuditingFindHttpCommunicationService } from './auditing-find-http-communication.service';

@QueryHandler(AuditingFindHttpCommunicationQuery)
export class AuditingFindHttpCommunicationQueryHandler implements IQueryHandler<AuditingFindHttpCommunicationQuery>
{
    private readonly mapper: AuditingHttpCommunicationMapper = new AuditingHttpCommunicationMapper();

    constructor(
        private readonly findHttpCommunicationService: AuditingFindHttpCommunicationService,
    ) {}

    async execute(query: AuditingFindHttpCommunicationQuery): Promise<AuditingHttpCommunicationResponse>
    {
        const httpCommunication = await this.findHttpCommunicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(httpCommunication);
    }
}
