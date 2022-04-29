import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { CQMetadata } from 'aurora-ts-core';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from '../../domain/value-objects';
import { IRefreshTokenRepository } from '../../domain/refresh-token.repository';
import { OAuthRefreshToken } from '../../domain/refresh-token.aggregate';
import { AddRefreshTokensContextEvent } from '../events/add-refresh-tokens-context.event';

@Injectable()
export class CreateRefreshTokensService
{
    constructor(
        private readonly publisher: EventPublisher,
        private readonly repository: IRefreshTokenRepository,
    ) {}

    async main(
        refreshTokens: {
            id: RefreshTokenId;
            accessTokenId: RefreshTokenAccessTokenId;
            token: RefreshTokenToken;
            isRevoked: RefreshTokenIsRevoked;
            expiresAt: RefreshTokenExpiresAt;
        } [],
        cQMetadata?: CQMetadata,
    ): Promise<void>
    {
        // create aggregate with factory pattern
        const aggregateRefreshTokens = refreshTokens.map(refreshToken => OAuthRefreshToken.register(
            refreshToken.id,
            refreshToken.accessTokenId,
            refreshToken.token,
            refreshToken.isRevoked,
            refreshToken.expiresAt,
            new RefreshTokenCreatedAt({ currentTimestamp: true }),
            new RefreshTokenUpdatedAt({ currentTimestamp: true }),
            null, // deleteAt
        ));

        // insert
        await this.repository.insert(aggregateRefreshTokens, { insertOptions: cQMetadata?.repositoryOptions });

        // create AddRefreshTokensContextEvent to have object wrapper to add event publisher functionality
        // insert EventBus in object, to be able to apply and commit events
        const refreshTokensRegistered = this.publisher.mergeObjectContext(new AddRefreshTokensContextEvent(aggregateRefreshTokens));

        refreshTokensRegistered.created(); // apply event to model events
        refreshTokensRegistered.commit(); // commit all events of model
    }
}