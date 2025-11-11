import { OAuthPaginateClientsQuery } from '@app/o-auth/client';
import { OAuthPaginateClientsService } from '@app/o-auth/client/application/paginate/o-auth-paginate-clients.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateClientsQuery)
export class OAuthPaginateClientsQueryHandler
    implements IQueryHandler<OAuthPaginateClientsQuery>
{
    constructor(
        private readonly paginateClientsService: OAuthPaginateClientsService,
    ) {}

    async execute(
        query: OAuthPaginateClientsQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateClientsService.main(
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
