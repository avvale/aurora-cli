import { OAuthMaxRefreshTokenQuery } from '@app/o-auth/refresh-token';
import { OAuthMaxRefreshTokenService } from '@app/o-auth/refresh-token/application/max/o-auth-max-refresh-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxRefreshTokenQuery)
export class OAuthMaxRefreshTokenQueryHandler implements IQueryHandler<OAuthMaxRefreshTokenQuery>
{
    constructor(
        private readonly maxRefreshTokenService: OAuthMaxRefreshTokenService,
    ) {}

    async execute(query: OAuthMaxRefreshTokenQuery): Promise<number>
    {
        return await this.maxRefreshTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
