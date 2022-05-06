/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    ApplicationId,
    ApplicationName,
    ApplicationCode,
    ApplicationSecret,
    ApplicationIsMaster,
    ApplicationClientIds,
    ApplicationCreatedAt,
    ApplicationUpdatedAt,
    ApplicationDeletedAt,
} from './value-objects';
import { CreatedApplicationEvent } from '../application/events/created-application.event';
import { UpdatedApplicationEvent } from '../application/events/updated-application.event';
import { DeletedApplicationEvent } from '../application/events/deleted-application.event';
import { OAuthClient } from '../../../../@apps/o-auth/client/domain/client.aggregate';

export class OAuthApplication extends AggregateRoot
{
    id: ApplicationId;
    name: ApplicationName;
    code: ApplicationCode;
    secret: ApplicationSecret;
    isMaster: ApplicationIsMaster;
    clientIds: ApplicationClientIds;
    createdAt: ApplicationCreatedAt;
    updatedAt: ApplicationUpdatedAt;
    deletedAt: ApplicationDeletedAt;

    // eager relationship
    clients: OAuthClient[];

    constructor(
        id: ApplicationId,
        name: ApplicationName,
        code: ApplicationCode,
        secret: ApplicationSecret,
        isMaster: ApplicationIsMaster,
        clientIds: ApplicationClientIds,
        createdAt: ApplicationCreatedAt,
        updatedAt: ApplicationUpdatedAt,
        deletedAt: ApplicationDeletedAt,

        clients?: OAuthClient[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
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
        id: ApplicationId,
        name: ApplicationName,
        code: ApplicationCode,
        secret: ApplicationSecret,
        isMaster: ApplicationIsMaster,
        clientIds: ApplicationClientIds,
        createdAt: ApplicationCreatedAt,
        updatedAt: ApplicationUpdatedAt,
        deletedAt: ApplicationDeletedAt,

        clients?: OAuthClient[],
    ): OAuthApplication
    {
        return new OAuthApplication(
            id,
            name,
            code,
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
            new CreatedApplicationEvent(
                application.id.value,
                application.name.value,
                application.code.value,
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
            new UpdatedApplicationEvent(
                application.id.value,
                application.name?.value,
                application.code?.value,
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
            new DeletedApplicationEvent(
                application.id.value,
                application.name.value,
                application.code.value,
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
            name: this.name.value,
            code: this.code.value,
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


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
