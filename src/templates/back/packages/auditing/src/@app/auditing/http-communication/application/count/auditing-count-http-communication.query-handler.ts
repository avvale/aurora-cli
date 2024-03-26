import { AuditingCountHttpCommunicationQuery } from '@app/auditing/http-communication';
import { AuditingCountHttpCommunicationService } from '@app/auditing/http-communication/application/count/auditing-count-http-communication.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingCountHttpCommunicationQuery)
export class AuditingCountHttpCommunicationQueryHandler implements IQueryHandler<AuditingCountHttpCommunicationQuery>
{
    constructor(
        private readonly countHttpCommunicationService: AuditingCountHttpCommunicationService,
    ) {}

    async execute(query: AuditingCountHttpCommunicationQuery): Promise<number>
    {
        return await this.countHttpCommunicationService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
