import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { OAuthPaginateClientsQuery } from './o-auth-paginate-clients.query';
import { OAuthPaginateClientsService } from './o-auth-paginate-clients.service';

@QueryHandler(OAuthPaginateClientsQuery)
export class OAuthPaginateClientsQueryHandler implements IQueryHandler<OAuthPaginateClientsQuery>
{
    constructor(
        private readonly paginateClientsService: OAuthPaginateClientsService,
    ) {}

    async execute(query: OAuthPaginateClientsQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateClientsService.main(
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
