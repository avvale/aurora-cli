/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    RefreshTokenId,
    RefreshTokenAccessTokenId,
    RefreshTokenToken,
    RefreshTokenIsRevoked,
    RefreshTokenExpiresAt,
    RefreshTokenCreatedAt,
    RefreshTokenUpdatedAt,
    RefreshTokenDeletedAt,
} from './value-objects';
import { CreatedRefreshTokenEvent } from '../application/events/created-refresh-token.event';
import { DeletedRefreshTokenEvent } from '../application/events/deleted-refresh-token.event';
import { OAuthAccessToken } from '../../../../@apps/o-auth/access-token/domain/access-token.aggregate';

export class OAuthRefreshToken extends AggregateRoot
{
    id: RefreshTokenId;
    accessTokenId: RefreshTokenAccessTokenId;
    token: RefreshTokenToken;
    isRevoked: RefreshTokenIsRevoked;
    expiresAt: RefreshTokenExpiresAt;
    createdAt: RefreshTokenCreatedAt;
    updatedAt: RefreshTokenUpdatedAt;
    deletedAt: RefreshTokenDeletedAt;

    // eager relationship
    accessToken: OAuthAccessToken;

    constructor(
        id: RefreshTokenId,
        accessTokenId: RefreshTokenAccessTokenId,
        token: RefreshTokenToken,
        isRevoked: RefreshTokenIsRevoked,
        expiresAt: RefreshTokenExpiresAt,
        createdAt: RefreshTokenCreatedAt,
        updatedAt: RefreshTokenUpdatedAt,
        deletedAt: RefreshTokenDeletedAt,

        accessToken?: OAuthAccessToken,
    )
    {
        super();
        this.id = id;
        this.accessTokenId = accessTokenId;
        this.token = token;
        this.isRevoked = isRevoked;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.accessToken = accessToken;
    }

    static register (
        id: RefreshTokenId,
        accessTokenId: RefreshTokenAccessTokenId,
        token: RefreshTokenToken,
        isRevoked: RefreshTokenIsRevoked,
        expiresAt: RefreshTokenExpiresAt,
        createdAt: RefreshTokenCreatedAt,
        updatedAt: RefreshTokenUpdatedAt,
        deletedAt: RefreshTokenDeletedAt,

        accessToken?: OAuthAccessToken,
    ): OAuthRefreshToken
    {
        return new OAuthRefreshToken(
            id,
            accessTokenId,
            token,
            isRevoked,
            expiresAt,
            createdAt,
            updatedAt,
            deletedAt,

            accessToken,
        );
    }

    created(refreshToken: OAuthRefreshToken): void
    {
        this.apply(
            new CreatedRefreshTokenEvent(
                refreshToken.id.value,
                refreshToken.accessTokenId.value,
                refreshToken.token.value,
                refreshToken.isRevoked.value,
                refreshToken.expiresAt?.value,
                refreshToken.createdAt?.value,
                refreshToken.updatedAt?.value,
                refreshToken.deletedAt?.value,
            ),
        );
    }

    deleted(refreshToken: OAuthRefreshToken): void
    {
        this.apply(
            new DeletedRefreshTokenEvent(
                refreshToken.id.value,
                refreshToken.accessTokenId.value,
                refreshToken.token.value,
                refreshToken.isRevoked.value,
                refreshToken.expiresAt?.value,
                refreshToken.createdAt?.value,
                refreshToken.updatedAt?.value,
                refreshToken.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            accessTokenId: this.accessTokenId.value,
            token: this.token.value,
            isRevoked: this.isRevoked.value,
            expiresAt: this.expiresAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            accessToken: this.accessToken?.toDTO(),
        };
    }


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
