import { OAuthAddRefreshTokensContextEvent, OAuthIRefreshTokenRepository, OAuthRefreshToken } from '@app/o-auth/refresh-token';
import {
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenDeletedAt,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenId,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenUpdatedAt,
} from '@app/o-auth/refresh-token/domain/value-objects';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';

@Injectable()
export class OAuthUpdateAndIncrementRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: OAuthIRefreshTokenRepository,
    ) {}

    async main(
        payload: {
            id?: OAuthRefreshTokenId;
            accessTokenId?: OAuthRefreshTokenAccessTokenId;
            token?: OAuthRefreshTokenToken;
            isRevoked?: OAuthRefreshTokenIsRevoked;
            expiresAt?: OAuthRefreshTokenExpiresAt;
        },
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const refreshToken = OAuthRefreshToken.register(
            payload.id,
            payload.accessTokenId,
            payload.token,
            payload.isRevoked,
            payload.expiresAt,
            null, // createdAt
            new OAuthRefreshTokenUpdatedAt({ currentTimestamp: true }),
            null, // deletedAt
        );

        // update and increment
        await this.repository.updateAndIncrement(
            refreshToken,
            {
                queryStatement,
                constraint,
                cQMetadata,
                updateAndIncrementOptions: cQMetadata?.repositoryOptions,
            },
        );

        // get objects to delete
        const refreshTokens = await this.repository.get(
            {
                queryStatement,
                constraint,
                cQMetadata,
            },
        );

        // merge EventBus methods with object returned by the repository, to be able to apply and commit events
        const refreshTokensRegister = this.publisher.mergeObjectContext(
            new OAuthAddRefreshTokensContextEvent(refreshTokens),
        );

        refreshTokensRegister.updatedAndIncremented(); // apply event to model events
        refreshTokensRegister.commit(); // commit all events of model
    }
}
