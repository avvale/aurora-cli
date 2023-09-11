import { OAuthAccessTokenMapper } from '@app/o-auth/access-token';
import { OAuthRefreshToken, OAuthRefreshTokenResponse } from '@app/o-auth/refresh-token';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenDeletedAt,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenUpdatedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CQMetadata, IMapper, LiteralObject, MapperOptions } from '@aurorajs.dev/core';

export class OAuthRefreshTokenMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param refreshToken
     */
    mapModelToAggregate(refreshToken: LiteralObject, cQMetadata?: CQMetadata): OAuthRefreshToken
    {
        if (!refreshToken) return;

        return this.makeAggregate(refreshToken, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param refreshTokens
     */
    mapModelsToAggregates(refreshTokens: LiteralObject[], cQMetadata?: CQMetadata): OAuthRefreshToken[]
    {
        if (!Array.isArray(refreshTokens)) return;

        return refreshTokens.map(refreshToken => this.makeAggregate(refreshToken, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param refreshToken
     */
    mapAggregateToResponse(refreshToken: OAuthRefreshToken): OAuthRefreshTokenResponse
    {
        return this.makeResponse(refreshToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param refreshTokens
     */
    mapAggregatesToResponses(refreshTokens: OAuthRefreshToken[]): OAuthRefreshTokenResponse[]
    {
        if (!Array.isArray(refreshTokens)) return;

        return refreshTokens.map(refreshToken => this.makeResponse(refreshToken));
    }

    private makeAggregate(refreshToken: LiteralObject, cQMetadata?: CQMetadata): OAuthRefreshToken
    {
        return OAuthRefreshToken.register(
            new OAuthRefreshTokenId(refreshToken.id, { undefinable: true }),
            new OAuthRefreshTokenAccessTokenId(refreshToken.accessTokenId, { undefinable: true }),
            new OAuthRefreshTokenToken(refreshToken.token, { undefinable: true }),
            new OAuthRefreshTokenIsRevoked(refreshToken.isRevoked, { undefinable: true }),
            new OAuthRefreshTokenExpiresAt(refreshToken.expiresAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new OAuthRefreshTokenCreatedAt(refreshToken.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new OAuthRefreshTokenUpdatedAt(refreshToken.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new OAuthRefreshTokenDeletedAt(refreshToken.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new OAuthAccessTokenMapper({ eagerLoading: true }).mapModelToAggregate(refreshToken.accessToken, cQMetadata) : undefined,
        );
    }

    private makeResponse(refreshToken: OAuthRefreshToken): OAuthRefreshTokenResponse
    {
        if (!refreshToken) return;

        return new OAuthRefreshTokenResponse(
            refreshToken.id.value,
            refreshToken.accessTokenId.value,
            refreshToken.token.value,
            refreshToken.isRevoked.value,
            refreshToken.expiresAt.value,
            refreshToken.createdAt.value,
            refreshToken.updatedAt.value,
            refreshToken.deletedAt.value,
            this.options.eagerLoading ? new OAuthAccessTokenMapper({ eagerLoading: true }).mapAggregateToResponse(refreshToken.accessToken) : undefined,
        );
    }
}
