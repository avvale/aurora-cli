/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    AccessTokenId,
    AccessTokenClientId,
    AccessTokenAccountId,
    AccessTokenToken,
    AccessTokenName,
    AccessTokenIsRevoked,
    AccessTokenExpiresAt,
    AccessTokenCreatedAt,
    AccessTokenUpdatedAt,
    AccessTokenDeletedAt,
} from './value-objects';
import { CreatedAccessTokenEvent } from '../application/events/created-access-token.event';
import { DeletedAccessTokenEvent } from '../application/events/deleted-access-token.event';
import { OAuthRefreshToken } from '@apps/o-auth/refresh-token/domain/refresh-token.aggregate';
import { OAuthClient } from '@apps/o-auth/client/domain/client.aggregate';

export class OAuthAccessToken extends AggregateRoot
{
    id: AccessTokenId;
    clientId: AccessTokenClientId;
    accountId: AccessTokenAccountId;
    token: AccessTokenToken;
    name: AccessTokenName;
    isRevoked: AccessTokenIsRevoked;
    expiresAt: AccessTokenExpiresAt;
    createdAt: AccessTokenCreatedAt;
    updatedAt: AccessTokenUpdatedAt;
    deletedAt: AccessTokenDeletedAt;

    // eager relationship
    refreshToken: OAuthRefreshToken;
    client: OAuthClient;

    constructor(
        id: AccessTokenId,
        clientId: AccessTokenClientId,
        accountId: AccessTokenAccountId,
        token: AccessTokenToken,
        name: AccessTokenName,
        isRevoked: AccessTokenIsRevoked,
        expiresAt: AccessTokenExpiresAt,
        createdAt: AccessTokenCreatedAt,
        updatedAt: AccessTokenUpdatedAt,
        deletedAt: AccessTokenDeletedAt,

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
        id: AccessTokenId,
        clientId: AccessTokenClientId,
        accountId: AccessTokenAccountId,
        token: AccessTokenToken,
        name: AccessTokenName,
        isRevoked: AccessTokenIsRevoked,
        expiresAt: AccessTokenExpiresAt,
        createdAt: AccessTokenCreatedAt,
        updatedAt: AccessTokenUpdatedAt,
        deletedAt: AccessTokenDeletedAt,

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
            new CreatedAccessTokenEvent(
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
            new DeletedAccessTokenEvent(
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


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
