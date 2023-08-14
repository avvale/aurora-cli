/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    OAuthApplicationId,
    OAuthApplicationCode,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationIsMaster,
    OAuthApplicationClientIds,
    OAuthApplicationCreatedAt,
    OAuthApplicationUpdatedAt,
    OAuthApplicationDeletedAt,
} from './value-objects';
import { OAuthCreatedApplicationEvent } from '../application/events/o-auth-created-application.event';
import { OAuthUpdatedApplicationEvent } from '../application/events/o-auth-updated-application.event';
import { OAuthDeletedApplicationEvent } from '../application/events/o-auth-deleted-application.event';
import { OAuthClient } from '@app/o-auth/client';

export class OAuthApplication extends AggregateRoot
{
    id: OAuthApplicationId;
    code: OAuthApplicationCode;
    name: OAuthApplicationName;
    secret: OAuthApplicationSecret;
    isMaster: OAuthApplicationIsMaster;
    clientIds: OAuthApplicationClientIds;
    createdAt: OAuthApplicationCreatedAt;
    updatedAt: OAuthApplicationUpdatedAt;
    deletedAt: OAuthApplicationDeletedAt;

    // eager relationship
    clients: OAuthClient[];

    constructor(
        id: OAuthApplicationId,
        code: OAuthApplicationCode,
        name: OAuthApplicationName,
        secret: OAuthApplicationSecret,
        isMaster: OAuthApplicationIsMaster,
        clientIds: OAuthApplicationClientIds,
        createdAt: OAuthApplicationCreatedAt,
        updatedAt: OAuthApplicationUpdatedAt,
        deletedAt: OAuthApplicationDeletedAt,

        clients?: OAuthClient[],
    )
    {
        super();
        this.id = id;
        this.code = code;
        this.name = name;
        this.secret = secret;
        this.isMaster = isMaster;
        this.clientIds = clientIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.clients = clients;
    }

    static register (
        id: OAuthApplicationId,
        code: OAuthApplicationCode,
        name: OAuthApplicationName,
        secret: OAuthApplicationSecret,
        isMaster: OAuthApplicationIsMaster,
        clientIds: OAuthApplicationClientIds,
        createdAt: OAuthApplicationCreatedAt,
        updatedAt: OAuthApplicationUpdatedAt,
        deletedAt: OAuthApplicationDeletedAt,

        clients?: OAuthClient[],
    ): OAuthApplication
    {
        return new OAuthApplication(
            id,
            code,
            name,
            secret,
            isMaster,
            clientIds,
            createdAt,
            updatedAt,
            deletedAt,

            clients,
        );
    }

    created(application: OAuthApplication): void
    {
        this.apply(
            new OAuthCreatedApplicationEvent(
                application.id.value,
                application.code.value,
                application.name.value,
                application.secret.value,
                application.isMaster.value,
                application.clientIds?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    updated(application: OAuthApplication): void
    {
        this.apply(
            new OAuthUpdatedApplicationEvent(
                application.id?.value,
                application.code?.value,
                application.name?.value,
                application.secret?.value,
                application.isMaster?.value,
                application.clientIds?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    deleted(application: OAuthApplication): void
    {
        this.apply(
            new OAuthDeletedApplicationEvent(
                application.id.value,
                application.code.value,
                application.name.value,
                application.secret.value,
                application.isMaster.value,
                application.clientIds?.value,
                application.createdAt?.value,
                application.updatedAt?.value,
                application.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            secret: this.secret.value,
            isMaster: this.isMaster.value,
            clientIds: this.clientIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            clients: this.clients?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            secret: this.secret.value,
            isMaster: this.isMaster.value,
            clientIds: this.clientIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            clients: this.clients?.map(item => item.toDTO()),
        };
    }
}
