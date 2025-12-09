import { SupportPaginateIssuesQuery } from '@app/support/issue';
import { SupportPaginateIssuesService } from '@app/support/issue/application/paginate/support-paginate-issues.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(SupportPaginateIssuesQuery)
export class SupportPaginateIssuesQueryHandler
    implements IQueryHandler<SupportPaginateIssuesQuery>
{
    constructor(
        private readonly paginateIssuesService: SupportPaginateIssuesService,
    ) {}

    async execute(
        query: SupportPaginateIssuesQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateIssuesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return new PaginationResponse(
            total,
            count,
            rows.map((item) => item.toDTO()),
        );
    }
}
