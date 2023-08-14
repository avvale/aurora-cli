/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    OAuthAccessTokenId,
    OAuthAccessTokenClientId,
    OAuthAccessTokenAccountId,
    OAuthAccessTokenToken,
    OAuthAccessTokenName,
    OAuthAccessTokenIsRevoked,
    OAuthAccessTokenExpiresAt,
    OAuthAccessTokenCreatedAt,
    OAuthAccessTokenUpdatedAt,
    OAuthAccessTokenDeletedAt,
} from './value-objects';
import { OAuthCreatedAccessTokenEvent } from '../application/events/o-auth-created-access-token.event';
import { OAuthDeletedAccessTokenEvent } from '../application/events/o-auth-deleted-access-token.event';
import { OAuthRefreshToken } from '@app/o-auth/refresh-token';
import { OAuthClient } from '@app/o-auth/client';

export class OAuthAccessToken extends AggregateRoot
{
    id: OAuthAccessTokenId;
    clientId: OAuthAccessTokenClientId;
    accountId: OAuthAccessTokenAccountId;
    token: OAuthAccessTokenToken;
    name: OAuthAccessTokenName;
    isRevoked: OAuthAccessTokenIsRevoked;
    expiresAt: OAuthAccessTokenExpiresAt;
    createdAt: OAuthAccessTokenCreatedAt;
    updatedAt: OAuthAccessTokenUpdatedAt;
    deletedAt: OAuthAccessTokenDeletedAt;

    // eager relationship
    refreshToken: OAuthRefreshToken;
    client: OAuthClient;

    constructor(
        id: OAuthAccessTokenId,
        clientId: OAuthAccessTokenClientId,
        accountId: OAuthAccessTokenAccountId,
        token: OAuthAccessTokenToken,
        name: OAuthAccessTokenName,
        isRevoked: OAuthAccessTokenIsRevoked,
        expiresAt: OAuthAccessTokenExpiresAt,
        createdAt: OAuthAccessTokenCreatedAt,
        updatedAt: OAuthAccessTokenUpdatedAt,
        deletedAt: OAuthAccessTokenDeletedAt,

        refreshToken?: OAuthRefreshToken,
        client?: OAuthClient,
    )
    {
        super();
        this.id = id;
        this.clientId = clientId;
        this.accountId = accountId;
        this.token = token;
        this.name = name;
        this.isRevoked = isRevoked;
        this.expiresAt = expiresAt;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.refreshToken = refreshToken;
        this.client = client;
    }

    static register (
        id: OAuthAccessTokenId,
        clientId: OAuthAccessTokenClientId,
        accountId: OAuthAccessTokenAccountId,
        token: OAuthAccessTokenToken,
        name: OAuthAccessTokenName,
        isRevoked: OAuthAccessTokenIsRevoked,
        expiresAt: OAuthAccessTokenExpiresAt,
        createdAt: OAuthAccessTokenCreatedAt,
        updatedAt: OAuthAccessTokenUpdatedAt,
        deletedAt: OAuthAccessTokenDeletedAt,

        refreshToken?: OAuthRefreshToken,
        client?: OAuthClient,
    ): OAuthAccessToken
    {
        return new OAuthAccessToken(
            id,
            clientId,
            accountId,
            token,
            name,
            isRevoked,
            expiresAt,
            createdAt,
            updatedAt,
            deletedAt,

            refreshToken,
            client,
        );
    }

    created(accessToken: OAuthAccessToken): void
    {
        this.apply(
            new OAuthCreatedAccessTokenEvent(
                accessToken.id.value,
                accessToken.clientId.value,
                accessToken.accountId?.value,
                accessToken.token.value,
                accessToken.name?.value,
                accessToken.isRevoked.value,
                accessToken.expiresAt?.value,
                accessToken.createdAt?.value,
                accessToken.updatedAt?.value,
                accessToken.deletedAt?.value,
            ),
        );
    }

    deleted(accessToken: OAuthAccessToken): void
    {
        this.apply(
            new OAuthDeletedAccessTokenEvent(
                accessToken.id.value,
                accessToken.clientId.value,
                accessToken.accountId?.value,
                accessToken.token.value,
                accessToken.name?.value,
                accessToken.isRevoked.value,
                accessToken.expiresAt?.value,
                accessToken.createdAt?.value,
                accessToken.updatedAt?.value,
                accessToken.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            clientId: this.clientId.value,
            accountId: this.accountId?.value,
            token: this.token.value,
            name: this.name?.value,
            isRevoked: this.isRevoked.value,
            expiresAt: this.expiresAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            refreshToken: this.refreshToken?.toDTO(),
            client: this.client?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            clientId: this.clientId.value,
            accountId: this.accountId?.value,
            token: this.token.value,
            name: this.name?.value,
            isRevoked: this.isRevoked.value,
            expiresAt: this.expiresAt?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            refreshToken: this.refreshToken?.toDTO(),
            client: this.client?.toDTO(),
        };
    }
}
