import { OAuthSumRefreshTokenQuery } from '@app/o-auth/refresh-token';
import { OAuthSumRefreshTokenService } from '@app/o-auth/refresh-token/application/sum/o-auth-sum-refresh-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumRefreshTokenQuery)
export class OAuthSumRefreshTokenQueryHandler implements IQueryHandler<OAuthSumRefreshTokenQuery>
{
    constructor(
        private readonly sumRefreshTokenService: OAuthSumRefreshTokenService,
    ) {}

    async execute(query: OAuthSumRefreshTokenQuery): Promise<number>
    {
        return await this.sumRefreshTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
