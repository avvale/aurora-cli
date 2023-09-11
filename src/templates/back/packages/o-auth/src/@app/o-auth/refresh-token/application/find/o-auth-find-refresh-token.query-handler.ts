import { OAuthFindRefreshTokenQuery, OAuthRefreshTokenMapper, OAuthRefreshTokenResponse } from '@app/o-auth/refresh-token';
import { OAuthFindRefreshTokenService } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindRefreshTokenQuery)
export class OAuthFindRefreshTokenQueryHandler implements IQueryHandler<OAuthFindRefreshTokenQuery>
{
    private readonly mapper: OAuthRefreshTokenMapper = new OAuthRefreshTokenMapper();

    constructor(
        private readonly findRefreshTokenService: OAuthFindRefreshTokenService,
    ) {}

    async execute(query: OAuthFindRefreshTokenQuery): Promise<OAuthRefreshTokenResponse>
    {
        const refreshToken = await this.findRefreshTokenService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(refreshToken);
    }
}
