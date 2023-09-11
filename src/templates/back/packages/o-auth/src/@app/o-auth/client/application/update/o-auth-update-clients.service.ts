import { OAuthAddClientsContextEvent, OAuthClient, OAuthIClientRepository } from '@app/o-auth/client';
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
    OAuthClientScopeOptions,
    OAuthClientSecret,
    OAuthClientUpdatedAt,
} from '@app/o-auth/client/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateClientsService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        payload: {
            id?: OAuthClientId;
            grantType?: OAuthClientGrantType;
            name?: OAuthClientName;
            secret?: OAuthClientSecret;
            authUrl?: OAuthClientAuthUrl;
            redirect?: OAuthClientRedirect;
            scopeOptions?: OAuthClientScopeOptions;
            expiredAccessToken?: OAuthClientExpiredAccessToken;
            expiredRefreshToken?: OAuthClientExpiredRefreshToken;
            isActive?: OAuthClientIsActive;
            isMaster?: OAuthClientIsMaster;
            applicationIds?: OAuthClientApplicationIds;
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
            new OAuthClientUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update
        await this.repository.update(
            client,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const clients = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientsRegister = this.publisher.mergeObjectContext(
            new OAuthAddClientsContextEvent(clients),
        );

        clientsRegister.updated(); // apply event to model events
        clientsRegister.commit(); // commit all events of model
    }
}
