import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { OAuthRefreshToken } from './refresh-token.aggregate';
import { RefreshTokenResponse } from './refresh-token.response';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from './value-objects';
import { AccessTokenMapper } from '../../../../@apps/o-auth/access-token/domain/access-token.mapper';

export class RefreshTokenMapper implements IMapper
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

        return refreshTokens.map(refreshToken  => this.makeAggregate(refreshToken, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param refreshToken
     */
    mapAggregateToResponse(refreshToken: OAuthRefreshToken): RefreshTokenResponse
    {
        return this.makeResponse(refreshToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param refreshTokens
     */
    mapAggregatesToResponses(refreshTokens: OAuthRefreshToken[]): RefreshTokenResponse[]
    {
        if (!Array.isArray(refreshTokens)) return;

        return refreshTokens.map(refreshToken => this.makeResponse(refreshToken));
    }

    private makeAggregate(refreshToken: LiteralObject, cQMetadata?: CQMetadata): OAuthRefreshToken
    {
        return OAuthRefreshToken.register(
            new RefreshTokenId(refreshToken.id, { undefinable: true }),
            new RefreshTokenAccessTokenId(refreshToken.accessTokenId, { undefinable: true }),
            new RefreshTokenToken(refreshToken.token, { undefinable: true }),
            new RefreshTokenIsRevoked(refreshToken.isRevoked, { undefinable: true }),
            new RefreshTokenExpiresAt(refreshToken.expiresAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new RefreshTokenCreatedAt(refreshToken.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new RefreshTokenUpdatedAt(refreshToken.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new RefreshTokenDeletedAt(refreshToken.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: true }).mapModelToAggregate(refreshToken.accessToken) : undefined,
        );
    }

    private makeResponse(refreshToken: OAuthRefreshToken): RefreshTokenResponse
    {
        if (!refreshToken) return;

        return new RefreshTokenResponse(
            refreshToken.id.value,
            refreshToken.accessTokenId.value,
            refreshToken.token.value,
            refreshToken.isRevoked.value,
            refreshToken.expiresAt.value,
            refreshToken.createdAt.value,
            refreshToken.updatedAt.value,
            refreshToken.deletedAt.value,
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: true }).mapAggregateToResponse(refreshToken.accessToken) : undefined,
        );
    }
}