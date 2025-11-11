/* eslint-disable key-spacing */
import { OAuthAccessToken } from '@app/o-auth/access-token';
import { OAuthApplication } from '@app/o-auth/application';
import {
    OAuthCreatedClientEvent,
    OAuthDeletedClientEvent,
    OAuthUpdatedClientEvent,
} from '@app/o-auth/client';
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
    OAuthClientRowId,
    OAuthClientScopeOptions,
    OAuthClientSecret,
    OAuthClientUpdatedAt,
} from '@app/o-auth/client/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthClient extends AggregateRoot {
    id: OAuthClientId;
    rowId: OAuthClientRowId;
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
        rowId: OAuthClientRowId,
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
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
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
        rowId: OAuthClientRowId,
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
    ): OAuthClient {
        return new OAuthClient(
            id,
            rowId,
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

    created(event: { payload: OAuthClient; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthCreatedClientEvent({
                payload: {
                    id: event.payload.id.value,
                    grantType: event.payload.grantType.value,
                    name: event.payload.name.value,
                    secret: event.payload.secret.value,
                    authUrl: event.payload.authUrl?.value,
                    redirect: event.payload.redirect?.value,
                    scopeOptions: event.payload.scopeOptions?.value,
                    expiredAccessToken: event.payload.expiredAccessToken?.value,
                    expiredRefreshToken:
                        event.payload.expiredRefreshToken?.value,
                    isActive: event.payload.isActive.value,
                    isMaster: event.payload.isMaster.value,
                    applicationIds: event.payload.applicationIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: OAuthClient; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthUpdatedClientEvent({
                payload: {
                    id: event.payload.id?.value,
                    grantType: event.payload.grantType?.value,
                    name: event.payload.name?.value,
                    secret: event.payload.secret?.value,
                    authUrl: event.payload.authUrl?.value,
                    redirect: event.payload.redirect?.value,
                    scopeOptions: event.payload.scopeOptions?.value,
                    expiredAccessToken: event.payload.expiredAccessToken?.value,
                    expiredRefreshToken:
                        event.payload.expiredRefreshToken?.value,
                    isActive: event.payload.isActive?.value,
                    isMaster: event.payload.isMaster?.value,
                    applicationIds: event.payload.applicationIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: OAuthClient; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthDeletedClientEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    grantType: event.payload.grantType.value,
                    name: event.payload.name.value,
                    secret: event.payload.secret.value,
                    authUrl: event.payload.authUrl?.value,
                    redirect: event.payload.redirect?.value,
                    scopeOptions: event.payload.scopeOptions?.value,
                    expiredAccessToken: event.payload.expiredAccessToken?.value,
                    expiredRefreshToken:
                        event.payload.expiredRefreshToken?.value,
                    isActive: event.payload.isActive.value,
                    isMaster: event.payload.isMaster.value,
                    applicationIds: event.payload.applicationIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    toDTO(): LiteralObject {
        return {
            id: this.id.value,
            rowId: this.rowId.value,
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
            accessTokens: this.accessTokens?.map((item) => item.toDTO()),
            applications: this.applications?.map((item) => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
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
            accessTokens: this.accessTokens?.map((item) => item.toDTO()),
            applications: this.applications?.map((item) => item.toDTO()),
        };
    }
}
