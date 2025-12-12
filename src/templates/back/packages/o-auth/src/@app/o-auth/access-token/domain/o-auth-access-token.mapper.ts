import {
    OAuthAccessToken,
    OAuthAccessTokenResponse,
} from '@app/o-auth/access-token';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenDeletedAt,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenRowId,
    OAuthAccessTokenToken,
    OAuthAccessTokenUpdatedAt,
} from '@app/o-auth/access-token/domain/value-objects';
import { OAuthClientMapper } from '@app/o-auth/client';
import { OAuthRefreshTokenMapper } from '@app/o-auth/refresh-token';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class OAuthAccessTokenMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param accessToken
     */
    mapModelToAggregate(
        accessToken: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthAccessToken {
        if (!accessToken) return;

        return this.makeAggregate(accessToken, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param accessTokens
     */
    mapModelsToAggregates(
        accessTokens: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): OAuthAccessToken[] {
        if (!Array.isArray(accessTokens)) return;

        return accessTokens.map((accessToken) =>
            this.makeAggregate(accessToken, cQMetadata),
        );
    }

    /**
     * Map aggregate to response
     * @param accessToken
     */
    mapAggregateToResponse(
        accessToken: OAuthAccessToken,
    ): OAuthAccessTokenResponse {
        return this.makeResponse(accessToken);
    }

    /**
     * Map array of aggregates to array responses
     * @param accessTokens
     */
    mapAggregatesToResponses(
        accessTokens: OAuthAccessToken[],
    ): OAuthAccessTokenResponse[] {
        if (!Array.isArray(accessTokens)) return;

        return accessTokens.map((accessToken) =>
            this.makeResponse(accessToken),
        );
    }

    private makeAggregate(
        accessToken: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthAccessToken {
        return OAuthAccessToken.register(
            new OAuthAccessTokenId(accessToken.id, { undefinable: true }),
            new OAuthAccessTokenRowId(accessToken.rowId, { undefinable: true }),
            new OAuthAccessTokenClientId(accessToken.clientId, {
                undefinable: true,
            }),
            new OAuthAccessTokenAccountId(accessToken.accountId, {
                undefinable: true,
            }),
            new OAuthAccessTokenToken(accessToken.token, { undefinable: true }),
            new OAuthAccessTokenName(accessToken.name, { undefinable: true }),
            new OAuthAccessTokenIsRevoked(accessToken.isRevoked, {
                undefinable: true,
            }),
            new OAuthAccessTokenExpiresAt(
                accessToken.expiresAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new OAuthAccessTokenCreatedAt(
                accessToken.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new OAuthAccessTokenUpdatedAt(
                accessToken.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new OAuthAccessTokenDeletedAt(
                accessToken.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new OAuthRefreshTokenMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(accessToken.refreshToken, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new OAuthClientMapper({
                      eagerLoading: true,
                  }).mapModelToAggregate(accessToken.client, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(
        accessToken: OAuthAccessToken,
    ): OAuthAccessTokenResponse {
        if (!accessToken) return null;

        return new OAuthAccessTokenResponse(
            accessToken.id.value,
            accessToken.rowId.value,
            accessToken.clientId.value,
            accessToken.accountId.value,
            accessToken.token.value,
            accessToken.name.value,
            accessToken.isRevoked.value,
            accessToken.expiresAt.value,
            accessToken.createdAt.value,
            accessToken.updatedAt.value,
            accessToken.deletedAt.value,
            this.options.eagerLoading
                ? new OAuthRefreshTokenMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(accessToken.refreshToken)
                : undefined,
            this.options.eagerLoading
                ? new OAuthClientMapper({
                      eagerLoading: true,
                  }).mapAggregateToResponse(accessToken.client)
                : undefined,
        );
    }
}
