import { OAuthPaginateRefreshTokensQuery } from '@app/o-auth/refresh-token';
import { OAuthPaginateRefreshTokensService } from '@app/o-auth/refresh-token/application/paginate/o-auth-paginate-refresh-tokens.service';
import { PaginationResponse } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthPaginateRefreshTokensQuery)
export class OAuthPaginateRefreshTokensQueryHandler
    implements IQueryHandler<OAuthPaginateRefreshTokensQuery>
{
    constructor(
        private readonly paginateRefreshTokensService: OAuthPaginateRefreshTokensService,
    ) {}

    async execute(
        query: OAuthPaginateRefreshTokensQuery,
    ): Promise<PaginationResponse> {
        const { total, count, rows } =
            await this.paginateRefreshTokensService.main(
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
