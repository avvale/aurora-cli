import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import {
    ClientId,
    ClientGrantType,
    ClientName,
    ClientSecret,
    ClientAuthUrl,
    ClientRedirect,
    ClientScopeOptions,
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
export class UpdateClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IClientRepository,
    ) {}

    async main(
        payload: {
            id?: ClientId;
            grantType?: ClientGrantType;
            name?: ClientName;
            secret?: ClientSecret;
            authUrl?: ClientAuthUrl;
            redirect?: ClientRedirect;
            scopeOptions?: ClientScopeOptions;
            expiredAccessToken?: ClientExpiredAccessToken;
            expiredRefreshToken?: ClientExpiredRefreshToken;
            isActive?: ClientIsActive;
            isMaster?: ClientIsMaster;
            applicationIds?: ClientApplicationIds;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
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
            null, // createdAt
            new ClientUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );


        // update
        await this.repository.update(client, {
            queryStatement,
            constraint,
            cQMetadata,
            updateOptions: cQMetadata?.repositoryOptions,
        });

        // get objects to delete
        const clients = await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientsRegister = this.publisher.mergeObjectContext(
            new AddClientsContextEvent(clients),
        );

        clientsRegister.updated(); // apply event to model events
        clientsRegister.commit(); // commit all events of model
    }
}