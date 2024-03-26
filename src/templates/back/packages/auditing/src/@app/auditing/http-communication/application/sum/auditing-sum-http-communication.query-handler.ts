import { AuditingSumHttpCommunicationQuery } from '@app/auditing/http-communication';
import { AuditingSumHttpCommunicationService } from '@app/auditing/http-communication/application/sum/auditing-sum-http-communication.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingSumHttpCommunicationQuery)
export class AuditingSumHttpCommunicationQueryHandler implements IQueryHandler<AuditingSumHttpCommunicationQuery>
{
    constructor(
        private readonly sumHttpCommunicationService: AuditingSumHttpCommunicationService,
    ) {}

    async execute(query: AuditingSumHttpCommunicationQuery): Promise<number>
    {
        return await this.sumHttpCommunicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
