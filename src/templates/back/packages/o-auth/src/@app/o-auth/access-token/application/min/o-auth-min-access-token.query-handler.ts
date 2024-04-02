import { OAuthMinAccessTokenQuery } from '@app/o-auth/access-token';
import { OAuthMinAccessTokenService } from '@app/o-auth/access-token/application/min/o-auth-min-access-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMinAccessTokenQuery)
export class OAuthMinAccessTokenQueryHandler implements IQueryHandler<OAuthMinAccessTokenQuery>
{
    constructor(
        private readonly minAccessTokenService: OAuthMinAccessTokenService,
    ) {}

    async execute(query: OAuthMinAccessTokenQuery): Promise<number>
    {
        return await this.minAccessTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
