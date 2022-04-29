import { LiteralObject } from '@nestjs/common';
import { IMapper, MapperOptions, CQMetadata } from 'aurora-ts-core';
import { OAuthClient } from './client.aggregate';
import { ClientResponse } from './client.response';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from './value-objects';
import { AccessTokenMapper } from '../../../../@apps/o-auth/access-token/domain/access-token.mapper';
import { ApplicationMapper } from '../../../../@apps/o-auth/application/domain/application.mapper';

export class ClientMapper implements IMapper
{
    constructor(
        public options: MapperOptions = { eagerLoading: true },
    ) {}

    /**
     * Map object to aggregate
     * @param client
     */
    mapModelToAggregate(client: LiteralObject, cQMetadata?: CQMetadata): OAuthClient
    {
        if (!client) return;

        return this.makeAggregate(client, cQMetadata);
    }

    /**
     * Map array of objects to array aggregates
     * @param clients
     */
    mapModelsToAggregates(clients: LiteralObject[], cQMetadata?: CQMetadata): OAuthClient[]
    {
        if (!Array.isArray(clients)) return;

        return clients.map(client  => this.makeAggregate(client, cQMetadata));
    }

    /**
     * Map aggregate to response
     * @param client
     */
    mapAggregateToResponse(client: OAuthClient): ClientResponse
    {
        return this.makeResponse(client);
    }

    /**
     * Map array of aggregates to array responses
     * @param clients
     */
    mapAggregatesToResponses(clients: OAuthClient[]): ClientResponse[]
    {
        if (!Array.isArray(clients)) return;

        return clients.map(client => this.makeResponse(client));
    }

    private makeAggregate(client: LiteralObject, cQMetadata?: CQMetadata): OAuthClient
    {
        return OAuthClient.register(
            new ClientId(client.id, { undefinable: true }),
            new ClientGrantType(client.grantType, { undefinable: true }),
            new ClientName(client.name, { undefinable: true }),
            new ClientSecret(client.secret, { undefinable: true }),
            new ClientAuthUrl(client.authUrl, { undefinable: true }),
            new ClientRedirect(client.redirect, { undefinable: true }),
            new ClientExpiredAccessToken(client.expiredAccessToken, { undefinable: true }),
            new ClientExpiredRefreshToken(client.expiredRefreshToken, { undefinable: true }),
            new ClientIsActive(client.isActive, { undefinable: true }),
            new ClientIsMaster(client.isMaster, { undefinable: true }),
            new ClientApplicationIds(client.applicationIds, { undefinable: true }),
            new ClientCreatedAt(client.createdAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ClientUpdatedAt(client.updatedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            new ClientDeletedAt(client.deletedAt, { undefinable: true }, { addTimezone: cQMetadata?.timezone }),
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: true }).mapModelsToAggregates(client.accessTokens) : undefined,
            this.options.eagerLoading ? new ApplicationMapper({ eagerLoading: true }).mapModelsToAggregates(client.applications) : undefined,
        );
    }

    private makeResponse(client: OAuthClient): ClientResponse
    {
        if (!client) return;

        return new ClientResponse(
            client.id.value,
            client.grantType.value,
            client.name.value,
            client.secret.value,
            client.authUrl.value,
            client.redirect.value,
            client.expiredAccessToken.value,
            client.expiredRefreshToken.value,
            client.isActive.value,
            client.isMaster.value,
            client.applicationIds.value,
            client.createdAt.value,
            client.updatedAt.value,
            client.deletedAt.value,
            this.options.eagerLoading ? new AccessTokenMapper({ eagerLoading: true }).mapAggregatesToResponses(client.accessTokens) : undefined,
            this.options.eagerLoading ? new ApplicationMapper({ eagerLoading: true }).mapAggregatesToResponses(client.applications) : undefined,
        );
    }
}