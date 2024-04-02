import { OAuthAccessToken, OAuthAddAccessTokensContextEvent, OAuthIAccessTokenRepository } from '@app/o-auth/access-token';
import {
    OAuthAccessTokenAccountId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenDeletedAt,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenId,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenName,
    OAuthAccessTokenToken,
    OAuthAccessTokenUpdatedAt,
} from '@app/o-auth/access-token/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateAndIncrementAccessTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIAccessTokenRepository,
    ) {}

    async main(
        payload: {
            id?: OAuthAccessTokenId;
            clientId?: OAuthAccessTokenClientId;
            accountId?: OAuthAccessTokenAccountId;
            token?: OAuthAccessTokenToken;
            name?: OAuthAccessTokenName;
            isRevoked?: OAuthAccessTokenIsRevoked;
            expiresAt?: OAuthAccessTokenExpiresAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const accessToken = OAuthAccessToken.register(
            payload.id,
            payload.clientId,
            payload.accountId,
            payload.token,
            payload.name,
            payload.isRevoked,
            payload.expiresAt,
            null, // createdAt
            new OAuthAccessTokenUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            accessToken,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const accessTokens = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const accessTokensRegister = this.publisher.mergeObjectContext(
            new OAuthAddAccessTokensContextEvent(accessTokens),
        );

        accessTokensRegister.updatedAndIncremented(); // apply event to model events
        accessTokensRegister.commit(); // commit all events of model
    }
}
