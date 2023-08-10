import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PaginationResponse } from '@aurorajs.dev/core';
import { OAuthPaginateRefreshTokensQuery } from './o-auth-paginate-refresh-tokens.query';
import { OAuthPaginateRefreshTokensService } from './o-auth-paginate-refresh-tokens.service';

@QueryHandler(OAuthPaginateRefreshTokensQuery)
export class OAuthPaginateRefreshTokensQueryHandler implements IQueryHandler<OAuthPaginateRefreshTokensQuery>
{
    constructor(
        private readonly paginateRefreshTokensService: OAuthPaginateRefreshTokensService,
    ) {}

    async execute(query: OAuthPaginateRefreshTokensQuery): Promise<PaginationResponse>
    {
        const { total, count, rows } = await this.paginateRefreshTokensService.main(
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
