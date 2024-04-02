import { OAuthMinRefreshTokenQuery } from '@app/o-auth/refresh-token';
import { OAuthMinRefreshTokenService } from '@app/o-auth/refresh-token/application/min/o-auth-min-refresh-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinRefreshTokenQuery)
export class OAuthMinRefreshTokenQueryHandler implements IQueryHandler<OAuthMinRefreshTokenQuery>
{
    constructor(
        private readonly minRefreshTokenService: OAuthMinRefreshTokenService,
    ) {}

    async execute(query: OAuthMinRefreshTokenQuery): Promise<number>
    {
        return await this.minRefreshTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
