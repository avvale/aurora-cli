import { OAuthClient, OAuthIClientRepository } from '@app/o-auth/client';
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
export class OAuthCreateClientService {
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
        },
        cQMetadata?: CQMetadata,
    ): Promise<void> {
        // create aggregate with factory pattern
        const client = OAuthClient.register(
            payload.id,
            undefined, // rowId
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
            new OAuthClientCreatedAt({ currentTimestamp: true }),
            new OAuthClientUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        await this.repository.create(client, {
            createOptions: cQMetadata?.repositoryOptions,
        });

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const clientRegister = this.publisher.mergeObjectContext(client);

        clientRegister.created({
            payload: client,
            cQMetadata,
        }); // apply event to model events
        clientRegister.commit(); // commit all events of model
    }
}
