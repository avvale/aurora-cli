import {
    OAuthAddClientsContextEvent,
    OAuthClient,
    OAuthIClientRepository,
} from '@app/o-auth/client';
import {
    OAuthClientApplicationIds,
    OAuthClientAuthUrl,
    OAuthClientCreatedAt,
    OAuthClientExpiredAccessToken,
    OAuthClientExpiredRefreshToken,
    OAuthClientGrantType,
    OAuthClientId,
    OAuthClientIsActive,
    OAuthClientIsMaster,
    OAuthClientName,
    OAuthClientRedirect,
    OAuthClientScopeOptions,
    OAuthClientSecret,
    OAuthClientUpdatedAt,
} from '@app/o-auth/client/domain/value-objects';
import { CQMetadata } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthCreateClientsService {
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        payload: {
            id: OAuthClientId;
            grantType: OAuthClientGrantType;
            name: OAuthClientName;
            secret: OAuthClientSecret;
            authUrl: OAuthClientAuthUrl;
            redirect: OAuthClientRedirect;
            scopeOptions: OAuthClientScopeOptions;
            expiredAccessToken: OAuthClientExpiredAccessToken;
            expiredRefreshToken: OAuthClientExpiredRefreshToken;
            isActive: OAuthClientIsActive;
            isMaster: OAuthClientIsMaster;
            applicationIds: OAuthClientApplicationIds;
        }[],
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const clients = payload.map((client) =>
            OAuthClient.register(
                client.id,
                undefined, // rowId
                client.grantType,
                client.name,
                client.secret,
                client.authUrl,
                client.redirect,
                client.scopeOptions,
                client.expiredAccessToken,
                client.expiredRefreshToken,
                client.isActive,
                client.isMaster,
                client.applicationIds,
                new OAuthClientCreatedAt({ currentTimestamp: true }),
                new OAuthClientUpdatedAt({ currentTimestamp: true }),
                null, // deleteAt
            ),
        );

        // insert
        await this.repository.insert(clients, {
            insertOptions: cQMetadata?.repositoryOptions,
        });

        // create AddClientsContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const clientsRegistered = this.publisher.mergeObjectContext(
            new OAuthAddClientsContextEvent(clients, cQMetadata),
        );

        clientsRegistered.created(); // apply event to model events
        clientsRegistered.commit(); // commit all events of model
    }
}
