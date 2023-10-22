import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { AuditingPaginateHttpCommunicationsQuery } from './auditing-paginate-http-communications.query';
import { AuditingPaginateHttpCommunicationsService } from './auditing-paginate-http-communications.service';

@QueryHandler(AuditingPaginateHttpCommunicationsQuery)
export class AuditingPaginateHttpCommunicationsQueryHandler implements IQueryHandler<AuditingPaginateHttpCommunicationsQuery>
{
    constructor(
        private readonly paginateHttpCommunicationsService: AuditingPaginateHttpCommunicationsService,
    ) {}

    async execute(query: AuditingPaginateHttpCommunicationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateHttpCommunicationsService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map(item => item.toDTO()),
        );
    }
}
