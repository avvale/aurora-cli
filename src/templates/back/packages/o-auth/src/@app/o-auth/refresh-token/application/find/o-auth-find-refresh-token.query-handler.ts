import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthRefreshTokenResponse } from '../../domain/o-auth-refresh-token.response';
import { OAuthRefreshTokenMapper } from '../../domain/o-auth-refresh-token.mapper';
import { OAuthFindRefreshTokenQuery } from './o-auth-find-refresh-token.query';
import { OAuthFindRefreshTokenService } from './o-auth-find-refresh-token.service';

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
