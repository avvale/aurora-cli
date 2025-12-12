import { OAuthAccessTokenMapper } from '@app/o-auth/access-token';
import { OAuthApplicationMapper } from '@app/o-auth/application';
import { OAuthClient, OAuthClientResponse } from '@app/o-auth/client';
import {
    OAuthClientApplicationIds,
    OAuthClientAuthUrl,
    OAuthClientCreatedAt,
    OAuthClientDeletedAt,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientGrantType,
    OAuthClientId,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientName,
    OAuthClientRedirect,
    OAuthClientRowId,
    OAuthClientScopeOptions,
    OAuthClientSecret,
    OAuthClientUpdatedAt,
} from '@app/o-auth/client/domain/value-objects';
import {
    CQMetadata,
    IMapper,
    LiteralObject,
    MapperOptions,
} from '@aurorajs.dev/core';

export class OAuthClientMapper implements IMapper {
    constructor(public options: MapperOptions = { eagerLoading: true }) {}

    /**
     * Map object to aggregate
     * @param client
     */
    mapModelToAggregate(
        client: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthClient {
        if (!client) return;

        return this.makeAggregate(client, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param clients
     */
    mapModelsToAggregates(
        clients: LiteralObject[],
        cQMetadata?: CQMetadata,
    ): OAuthClient[] {
        if (!Array.isArray(clients)) return;

        return clients.map((client) => this.makeAggregate(client, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param client
     */
    mapAggregateToResponse(client: OAuthClient): OAuthClientResponse {
        return this.makeResponse(client);
    }

    /**
     * Map array of aggregates to array responses
     * @param clients
     */
    mapAggregatesToResponses(clients: OAuthClient[]): OAuthClientResponse[] {
        if (!Array.isArray(clients)) return;

        return clients.map((client) => this.makeResponse(client));
    }

    private makeAggregate(
        client: LiteralObject,
        cQMetadata?: CQMetadata,
    ): OAuthClient {
        return OAuthClient.register(
            new OAuthClientId(client.id, { undefinable: true }),
            new OAuthClientRowId(client.rowId, { undefinable: true }),
            new OAuthClientGrantType(client.grantType, { undefinable: true }),
            new OAuthClientName(client.name, { undefinable: true }),
            new OAuthClientSecret(client.secret, { undefinable: true }),
            new OAuthClientAuthUrl(client.authUrl, { undefinable: true }),
            new OAuthClientRedirect(client.redirect, { undefinable: true }),
            new OAuthClientScopeOptions(client.scopeOptions, {
                undefinable: true,
            }),
            new OAuthClientExpiredAccessToken(client.expiredAccessToken, {
                undefinable: true,
            }),
            new OAuthClientExpiredRefreshToken(client.expiredRefreshToken, {
                undefinable: true,
            }),
            new OAuthClientIsActive(client.isActive, { undefinable: true }),
            new OAuthClientIsMaster(client.isMaster, { undefinable: true }),
            new OAuthClientApplicationIds(client.applicationIds, {
                undefinable: true,
            }),
            new OAuthClientCreatedAt(
                client.createdAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new OAuthClientUpdatedAt(
                client.updatedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            new OAuthClientDeletedAt(
                client.deletedAt,
                { undefinable: true },
                { addTimezone: cQMetadata?.timezone },
            ),
            this.options.eagerLoading
                ? new OAuthAccessTokenMapper({
                      eagerLoading: true,
                  }).mapModelsToAggregates(client.accessTokens, cQMetadata)
                : undefined,
            this.options.eagerLoading
                ? new OAuthApplicationMapper({
                      eagerLoading: true,
                  }).mapModelsToAggregates(client.applications, cQMetadata)
                : undefined,
        );
    }

    private makeResponse(client: OAuthClient): OAuthClientResponse {
        if (!client) return null;

        return new OAuthClientResponse(
            client.id.value,
            client.rowId.value,
            client.grantType.value,
            client.name.value,
            client.secret.value,
            client.authUrl.value,
            client.redirect.value,
            client.scopeOptions.value,
            client.expiredAccessToken.value,
            client.expiredRefreshToken.value,
            client.isActive.value,
            client.isMaster.value,
            client.applicationIds.value,
            client.createdAt.value,
            client.updatedAt.value,
            client.deletedAt.value,
            this.options.eagerLoading
                ? new OAuthAccessTokenMapper({
                      eagerLoading: true,
                  }).mapAggregatesToResponses(client.accessTokens)
                : undefined,
            this.options.eagerLoading
                ? new OAuthApplicationMapper({
                      eagerLoading: true,
                  }).mapAggregatesToResponses(client.applications)
                : undefined,
        );
    }
}
