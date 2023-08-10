import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { OAuthPaginateApplicationsQuery } from './o-auth-paginate-applications.query';
import { OAuthPaginateApplicationsService } from './o-auth-paginate-applications.service';

@QueryHandler(OAuthPaginateApplicationsQuery)
export class OAuthPaginateApplicationsQueryHandler implements IQueryHandler<OAuthPaginateApplicationsQuery>
{
    constructor(
        private readonly paginateApplicationsService: OAuthPaginateApplicationsService,
    ) {}

    async execute(query: OAuthPaginateApplicationsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateApplicationsService.main(
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
