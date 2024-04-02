import { OAuthCountAccessTokenQuery } from '@app/o-auth/access-token';
import { OAuthCountAccessTokenService } from '@app/o-auth/access-token/application/count/o-auth-count-access-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthCountAccessTokenQuery)
export class OAuthCountAccessTokenQueryHandler implements IQueryHandler<OAuthCountAccessTokenQuery>
{
    constructor(
        private readonly countAccessTokenService: OAuthCountAccessTokenService,
    ) {}

    async execute(query: OAuthCountAccessTokenQuery): Promise<number>
    {
        return await this.countAccessTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );
    }
}
