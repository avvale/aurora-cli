import { OAuthFindRefreshTokenByIdQuery, OAuthRefreshTokenMapper, OAuthRefreshTokenResponse } from '@app/o-auth/refresh-token';
import { OAuthFindRefreshTokenByIdService } from '@app/o-auth/refresh-token/application/find/o-auth-find-refresh-token-by-id.service';
import { OAuthRefreshTokenId } from '@app/o-auth/refresh-token/domain/value-objects';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(OAuthFindRefreshTokenByIdQuery)
export class OAuthFindRefreshTokenByIdQueryHandler implements IQueryHandler<OAuthFindRefreshTokenByIdQuery>
{
    private readonly mapper: OAuthRefreshTokenMapper = new OAuthRefreshTokenMapper();

    constructor(
        private readonly findRefreshTokenByIdService: OAuthFindRefreshTokenByIdService,
    ) {}

    async execute(query: OAuthFindRefreshTokenByIdQuery): Promise<OAuthRefreshTokenResponse>
    {
        const refreshToken = await this.findRefreshTokenByIdService.main(
            new OAuthRefreshTokenId(query.id),
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(refreshToken);
    }
}
