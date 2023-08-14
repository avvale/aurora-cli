import { OAuthClient, OAuthIClientRepository } from '@app/o-auth/client';
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
export class OAuthUpdateClientByIdService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIClientRepository,
    ) {}

    async main(
        payload: {
            id: OAuthClientId;
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

        // update by id
        await this.repository.updateById(
            client,
            {
                constraint,
                cQMetadata,
                updateByIdOptions: cQMetadata?.repositoryOptions,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(
            client,
        );

        clientRegister.updated(client); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}
