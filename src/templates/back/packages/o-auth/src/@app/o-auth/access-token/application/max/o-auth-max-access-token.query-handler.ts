import { OAuthMaxAccessTokenQuery } from '@app/o-auth/access-token';
import { OAuthMaxAccessTokenService } from '@app/o-auth/access-token/application/max/o-auth-max-access-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthMaxAccessTokenQuery)
export class OAuthMaxAccessTokenQueryHandler implements IQueryHandler<OAuthMaxAccessTokenQuery>
{
    constructor(
        private readonly maxAccessTokenService: OAuthMaxAccessTokenService,
    ) {}

    async execute(query: OAuthMaxAccessTokenQuery): Promise<number>
    {
        return await this.maxAccessTokenService.main(
            query.column,
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
