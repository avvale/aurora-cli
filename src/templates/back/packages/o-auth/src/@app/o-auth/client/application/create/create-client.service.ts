import { ConflictException, Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from '@aurorajs.dev/core';
import { IClientRepository } from '../../domain/client.repository';
import { OAuthClient } from '../../domain/client.aggregate';
import {
    ClientApplicationIds,
    ClientAuthUrl,
    ClientCreatedAt,
    ClientDeletedAt,
    ClientExpiredAccessToken,
    ClientExpiredRefreshToken,
    ClientGrantType,
    ClientId,
    ClientIsActive,
    ClientIsMaster,
    ClientName,
    ClientRedirect,
    ClientScopeOptions,
    ClientSecret,
    ClientUpdatedAt,
} from '../../domain/value-objects';

@Injectable()
export class CreateClientService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    async main(
        payload: {
            id: ClientId;
            grantType: ClientGrantType;
            name: ClientName;
            secret: ClientSecret;
            authUrl: ClientAuthUrl;
            redirect: ClientRedirect;
            scopeOptions: ClientScopeOptions;
            expiredAccessToken: ClientExpiredAccessToken;
            expiredRefreshToken: ClientExpiredRefreshToken;
            isActive: ClientIsActive;
            isMaster: ClientIsMaster;
            applicationIds: ClientApplicationIds;
        },
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const client = OAuthClient.register(
            payload.id,
            payload.grantType,
            payload.name,
            payload.secret,
            payload.authUrl,
            payload.redirect,
            payload.scopeOptions,
            payload.expiredAccessToken,
            payload.expiredRefreshToken,
            payload.isActive,
            payload.isMaster,
            payload.applicationIds,
            new ClientCreatedAt({ currentTimestamp: true }),
            new ClientUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(client, { createOptions: cQMetadata?.repositoryOptions });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(
            client,
        );

        clientRegister.created(client); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}