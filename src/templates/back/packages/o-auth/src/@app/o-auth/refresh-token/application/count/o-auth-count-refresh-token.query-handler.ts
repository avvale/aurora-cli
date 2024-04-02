import { OAuthCountRefreshTokenQuery } from '@app/o-auth/refresh-token';
import { OAuthCountRefreshTokenService } from '@app/o-auth/refresh-token/application/count/o-auth-count-refresh-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountRefreshTokenQuery)
export class OAuthCountRefreshTokenQueryHandler implements IQueryHandler<OAuthCountRefreshTokenQuery>
{
    constructor(
        private readonly countRefreshTokenService: OAuthCountRefreshTokenService,
    ) {}

    async execute(query: OAuthCountRefreshTokenQuery): Promise<number>
    {
        return await this.countRefreshTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
