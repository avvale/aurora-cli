/* eslint-disable key-spacing */
import { OAuthCreatedApplicationEvent, OAuthDeletedApplicationEvent, OAuthUpdatedApplicationEvent } from '@app/o-auth/application';
import {
    OAuthApplicationClientIds,
    OAuthApplicationCode,
    OAuthApplicationCreatedAt,
    OAuthApplicationDeletedAt,
    OAuthApplicationId,
    OAuthApplicationIsMaster,
    OAuthApplicationName,
    OAuthApplicationSecret,
    OAuthApplicationUpdatedAt,
} from '@app/o-auth/application/domain/value-objects';
import { OAuthClient } from '@app/o-auth/client';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

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
        this.clients = clients;
    }

    static register(
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
            clients: this.clients?.map(item => item.toDTO()),
        };
    }
}
