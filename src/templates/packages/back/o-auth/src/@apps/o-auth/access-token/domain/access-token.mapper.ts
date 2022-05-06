import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { OAuthAccessToken } from './access-token.aggregate';
import { AccessTokenResponse } from './access-token.response';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from './value-objects';
import { RefreshTokenMapper } from '@apps/o-auth/refresh-token/domain/refresh-token.mapper';
import { ClientMapper } from '@apps/o-auth/client/domain/client.mapper';

export class AccessTokenMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param accessToken
     */
    mapModelToAggregate(accessToken: LiteralObject, cQMetadata?: CQMetadata): OAuthAccessToken
    {
        if (!accessToken) return;

        return this.makeAggregate(accessToken, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param accessTokens
     */
    mapModelsToAggregates(accessTokens: LiteralObject[], cQMetadata?: CQMetadata): OAuthAccessToken[]
    {
        if (!Array.isArray(accessTokens)) return;

        return accessTokens.map(accessToken  => this.makeAggregate(accessToken, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param accessToken
     */
    mapAggregateToResponse(accessToken: OAuthAccessToken): AccessTokenResponse
    {
        return this.makeResponse(accessToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param accessTokens
     */
    mapAggregatesToResponses(accessTokens: OAuthAccessToken[]): AccessTokenResponse[]
    {
        if (!Array.isArray(accessTokens)) return;

        return accessTokens.map(accessToken => this.makeResponse(accessToken));
    }

    private makeAggregate(accessToken: LiteralObject, cQMetadata?: CQMetadata): OAuthAccessToken
    {
        return OAuthAccessToken.register(
            new AccessTokenId(accessToken.id, { undefinable: true }),
            new AccessTokenClientId(accessToken.clientId, { undefinable: true }),
            new AccessTokenAccountId(accessToken.accountId, { undefinable: true }),
            new AccessTokenToken(accessToken.token, { undefinable: true }),
            new AccessTokenName(accessToken.name, { undefinable: true }),
            new AccessTokenIsRevoked(accessToken.isRevoked, { undefinable: true }),
            new AccessTokenExpiresAt(accessToken.expiresAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AccessTokenCreatedAt(accessToken.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AccessTokenUpdatedAt(accessToken.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new AccessTokenDeletedAt(accessToken.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new RefreshTokenMapper({ eagerLoading: true }).mapModelToAggregate(accessToken.refreshToken) : undefined,
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: true }).mapModelToAggregate(accessToken.client) : undefined,
        );
    }

    private makeResponse(accessToken: OAuthAccessToken): AccessTokenResponse
    {
        if (!accessToken) return;

        return new AccessTokenResponse(
            accessToken.id.value,
            accessToken.clientId.value,
            accessToken.accountId.value,
            accessToken.token.value,
            accessToken.name.value,
            accessToken.isRevoked.value,
            accessToken.expiresAt.value,
            accessToken.createdAt.value,
            accessToken.updatedAt.value,
            accessToken.deletedAt.value,
            this.options.eagerLoading ? new RefreshTokenMapper({ eagerLoading: true }).mapAggregateToResponse(accessToken.refreshToken) : undefined,
            this.options.eagerLoading ? new ClientMapper({ eagerLoading: true }).mapAggregateToResponse(accessToken.client) : undefined,
        );
    }
}