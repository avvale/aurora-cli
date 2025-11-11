import { OAuthPaginateScopesQuery } from '@app/o-auth/scope';
import { OAuthPaginateScopesService } from '@app/o-auth/scope/application/paginate/o-auth-paginate-scopes.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateScopesQuery)
export class OAuthPaginateScopesQueryHandler
    implements IQueryHandler<OAuthPaginateScopesQuery>
{
    constructor(
        private readonly paginateScopesService: OAuthPaginateScopesService,
    ) {}

    async execute(
        query: OAuthPaginateScopesQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } = await this.paginateScopesService.main(
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
