import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { OAuthRefreshTokenResponse } from '../../domain/o-auth-refresh-token.response';
import { OAuthRefreshTokenMapper } from '../../domain/o-auth-refresh-token.mapper';
import { OAuthRefreshTokenId } from '../../domain/value-objects';
import { OAuthFindRefreshTokenByIdQuery } from './o-auth-find-refresh-token-by-id.query';
import { OAuthFindRefreshTokenByIdService } from './o-auth-find-refresh-token-by-id.service';

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
