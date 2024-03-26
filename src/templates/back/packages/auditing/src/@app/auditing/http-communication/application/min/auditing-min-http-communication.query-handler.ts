import { AuditingMinHttpCommunicationQuery } from '@app/auditing/http-communication';
import { AuditingMinHttpCommunicationService } from '@app/auditing/http-communication/application/min/auditing-min-http-communication.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingMinHttpCommunicationQuery)
export class AuditingMinHttpCommunicationQueryHandler implements IQueryHandler<AuditingMinHttpCommunicationQuery>
{
    constructor(
        private readonly minHttpCommunicationService: AuditingMinHttpCommunicationService,
    ) {}

    async execute(query: AuditingMinHttpCommunicationQuery): Promise<number>
    {
        return await this.minHttpCommunicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
