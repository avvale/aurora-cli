/* eslint-disable key-spacing */
import { OAuthAccessToken } from '@app/o-auth/access-token';
import { OAuthApplication } from '@app/o-auth/application';
import { OAuthCreatedClientEvent, OAuthDeletedClientEvent, OAuthUpdatedClientEvent } from '@app/o-auth/client';
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
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthClient extends AggregateRoot
{
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
    createdAt: OAuthClientCreatedAt;
    updatedAt: OAuthClientUpdatedAt;
    deletedAt: OAuthClientDeletedAt;
    accessTokens: OAuthAccessToken[];
    applications: OAuthApplication[];

    constructor(
        id: OAuthClientId,
        grantType: OAuthClientGrantType,
        name: OAuthClientName,
        secret: OAuthClientSecret,
        authUrl: OAuthClientAuthUrl,
        redirect: OAuthClientRedirect,
        scopeOptions: OAuthClientScopeOptions,
        expiredAccessToken: OAuthClientExpiredAccessToken,
        expiredRefreshToken: OAuthClientExpiredRefreshToken,
        isActive: OAuthClientIsActive,
        isMaster: OAuthClientIsMaster,
        applicationIds: OAuthClientApplicationIds,
        createdAt: OAuthClientCreatedAt,
        updatedAt: OAuthClientUpdatedAt,
        deletedAt: OAuthClientDeletedAt,
        accessTokens?: OAuthAccessToken[],
        applications?: OAuthApplication[],
    )
    {
        super();
        this.id = id;
        this.grantType = grantType;
        this.name = name;
        this.secret = secret;
        this.authUrl = authUrl;
        this.redirect = redirect;
        this.scopeOptions = scopeOptions;
        this.expiredAccessToken = expiredAccessToken;
        this.expiredRefreshToken = expiredRefreshToken;
        this.isActive = isActive;
        this.isMaster = isMaster;
        this.applicationIds = applicationIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.accessTokens = accessTokens;
        this.applications = applications;
    }

    static register(
        id: OAuthClientId,
        grantType: OAuthClientGrantType,
        name: OAuthClientName,
        secret: OAuthClientSecret,
        authUrl: OAuthClientAuthUrl,
        redirect: OAuthClientRedirect,
        scopeOptions: OAuthClientScopeOptions,
        expiredAccessToken: OAuthClientExpiredAccessToken,
        expiredRefreshToken: OAuthClientExpiredRefreshToken,
        isActive: OAuthClientIsActive,
        isMaster: OAuthClientIsMaster,
        applicationIds: OAuthClientApplicationIds,
        createdAt: OAuthClientCreatedAt,
        updatedAt: OAuthClientUpdatedAt,
        deletedAt: OAuthClientDeletedAt,
        accessTokens?: OAuthAccessToken[],
        applications?: OAuthApplication[],
    ): OAuthClient
    {
        return new OAuthClient(
            id,
            grantType,
            name,
            secret,
            authUrl,
            redirect,
            scopeOptions,
            expiredAccessToken,
            expiredRefreshToken,
            isActive,
            isMaster,
            applicationIds,
            createdAt,
            updatedAt,
            deletedAt,
            accessTokens,
            applications,
        );
    }

    created(client: OAuthClient): void
    {
        this.apply(
            new OAuthCreatedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    updated(client: OAuthClient): void
    {
        this.apply(
            new OAuthUpdatedClientEvent(
                client.id?.value,
                client.grantType?.value,
                client.name?.value,
                client.secret?.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive?.value,
                client.isMaster?.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    deleted(client: OAuthClient): void
    {
        this.apply(
            new OAuthDeletedClientEvent(
                client.id.value,
                client.grantType.value,
                client.name.value,
                client.secret.value,
                client.authUrl?.value,
                client.redirect?.value,
                client.scopeOptions?.value,
                client.expiredAccessToken?.value,
                client.expiredRefreshToken?.value,
                client.isActive.value,
                client.isMaster.value,
                client.applicationIds?.value,
                client.createdAt?.value,
                client.updatedAt?.value,
                client.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            grantType: this.grantType.value,
            name: this.name.value,
            secret: this.secret.value,
            authUrl: this.authUrl?.value,
            redirect: this.redirect?.value,
            scopeOptions: this.scopeOptions?.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isActive: this.isActive.value,
            isMaster: this.isMaster.value,
            applicationIds: this.applicationIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            accessTokens: this.accessTokens?.map(item => item.toDTO()),
            applications: this.applications?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            grantType: this.grantType.value,
            name: this.name.value,
            secret: this.secret.value,
            authUrl: this.authUrl?.value,
            redirect: this.redirect?.value,
            scopeOptions: this.scopeOptions?.value,
            expiredAccessToken: this.expiredAccessToken?.value,
            expiredRefreshToken: this.expiredRefreshToken?.value,
            isActive: this.isActive.value,
            isMaster: this.isMaster.value,
            applicationIds: this.applicationIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            accessTokens: this.accessTokens?.map(item => item.toDTO()),
            applications: this.applications?.map(item => item.toDTO()),
        };
    }
}
