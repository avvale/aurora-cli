import { AuditingMaxHttpCommunicationQuery } from '@app/auditing/http-communication';
import { AuditingMaxHttpCommunicationService } from '@app/auditing/http-communication/application/max/auditing-max-http-communication.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(AuditingMaxHttpCommunicationQuery)
export class AuditingMaxHttpCommunicationQueryHandler implements IQueryHandler<AuditingMaxHttpCommunicationQuery>
{
    constructor(
        private readonly maxHttpCommunicationService: AuditingMaxHttpCommunicationService,
    ) {}

    async execute(query: AuditingMaxHttpCommunicationQuery): Promise<number>
    {
        return await this.maxHttpCommunicationService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
