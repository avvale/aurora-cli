/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    OAuthRefreshTokenId,
    OAuthRefreshTokenAccessTokenId,
    OAuthRefreshTokenToken,
    OAuthRefreshTokenIsRevoked,
    OAuthRefreshTokenExpiresAt,
    OAuthRefreshTokenCreatedAt,
    OAuthRefreshTokenUpdatedAt,
    OAuthRefreshTokenDeletedAt,
} from './value-objects';
import { OAuthCreatedRefreshTokenEvent } from '../application/events/o-auth-created-refresh-token.event';
import { OAuthDeletedRefreshTokenEvent } from '../application/events/o-auth-deleted-refresh-token.event';
import { OAuthAccessToken } from '@app/o-auth/access-token';

export class OAuthRefreshToken extends AggregateRoot
{
    id: OAuthRefreshTokenId;
    accessTokenId: OAuthRefreshTokenAccessTokenId;
    token: OAuthRefreshTokenToken;
    isRevoked: OAuthRefreshTokenIsRevoked;
    expiresAt: OAuthRefreshTokenExpiresAt;
    createdAt: OAuthRefreshTokenCreatedAt;
    updatedAt: OAuthRefreshTokenUpdatedAt;
    deletedAt: OAuthRefreshTokenDeletedAt;

    // eager relationship
    accessToken: OAuthAccessToken;

    constructor(
        id: OAuthRefreshTokenId,
        accessTokenId: OAuthRefreshTokenAccessTokenId,
        token: OAuthRefreshTokenToken,
        isRevoked: OAuthRefreshTokenIsRevoked,
        expiresAt: OAuthRefreshTokenExpiresAt,
        createdAt: OAuthRefreshTokenCreatedAt,
        updatedAt: OAuthRefreshTokenUpdatedAt,
        deletedAt: OAuthRefreshTokenDeletedAt,

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
        id: OAuthRefreshTokenId,
        accessTokenId: OAuthRefreshTokenAccessTokenId,
        token: OAuthRefreshTokenToken,
        isRevoked: OAuthRefreshTokenIsRevoked,
        expiresAt: OAuthRefreshTokenExpiresAt,
        createdAt: OAuthRefreshTokenCreatedAt,
        updatedAt: OAuthRefreshTokenUpdatedAt,
        deletedAt: OAuthRefreshTokenDeletedAt,

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
            new OAuthCreatedRefreshTokenEvent(
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
            new OAuthDeletedRefreshTokenEvent(
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

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
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
}
