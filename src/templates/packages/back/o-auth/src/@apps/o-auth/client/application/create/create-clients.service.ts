import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopes,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientIsActive,
    ClientIsMaster,
    ClientApplicationIds,
    ClientCreatedAt,
    ClientUpdatedAt,
    ClientDeletedAt,
} from '../../domain/value-objects';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';
import { AddClientsContextEvent } from '../events/add-clients-context.event';

@Injectable()
export class CreateClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    async main(
        clients: {
            id: ClientId;
            grantType: ClientGrantType;
            name: ClientName;
            secret: ClientSecret;
            authUrl: ClientAuthUrl;
            redirect: ClientRedirect;
            scopes: ClientScopes;
            expiredAccessToken: ClientExpiredAccessToken;
            expiredRefreshToken: ClientExpiredRefreshToken;
            isActive: ClientIsActive;
            isMaster: ClientIsMaster;
            applicationIds: ClientApplicationIds;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateClients = clients.map(client => OAuthClient.register(
            client.id,
            client.grantType,
            client.name,
            client.secret,
            client.authUrl,
            client.redirect,
            client.scopes,
            client.expiredAccessToken,
            client.expiredRefreshToken,
            client.isActive,
            client.isMaster,
            client.applicationIds,
            new ClientCreatedAt({ currentTimestamp: true }),
            new ClientUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateClients, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const clientsRegistered = this.publisher.mergeObjectContext(new AddClientsContextEvent(aggregateClients));

        clientsRegistered.created(); // apply event to model events
        clientsRegistered.commit(); // commit all events of model
    }
}