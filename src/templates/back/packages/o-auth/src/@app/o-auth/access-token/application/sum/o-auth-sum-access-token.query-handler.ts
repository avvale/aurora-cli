import { OAuthSumAccessTokenQuery } from '@app/o-auth/access-token';
import { OAuthSumAccessTokenService } from '@app/o-auth/access-token/application/sum/o-auth-sum-access-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthSumAccessTokenQuery)
export class OAuthSumAccessTokenQueryHandler implements IQueryHandler<OAuthSumAccessTokenQuery>
{
    constructor(
        private readonly sumAccessTokenService: OAuthSumAccessTokenService,
    ) {}

    async execute(query: OAuthSumAccessTokenQuery): Promise<number>
    {
        return await this.sumAccessTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
