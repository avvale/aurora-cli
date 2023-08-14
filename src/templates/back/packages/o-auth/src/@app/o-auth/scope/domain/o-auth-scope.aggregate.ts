/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    OAuthScopeId,
    OAuthScopeCode,
    OAuthScopeName,
    OAuthScopeCreatedAt,
    OAuthScopeUpdatedAt,
    OAuthScopeDeletedAt,
} from './value-objects';
import { OAuthCreatedScopeEvent } from '../application/events/o-auth-created-scope.event';
import { OAuthUpdatedScopeEvent } from '../application/events/o-auth-updated-scope.event';
import { OAuthDeletedScopeEvent } from '../application/events/o-auth-deleted-scope.event';

export class OAuthScope extends AggregateRoot
{
    id: OAuthScopeId;
    code: OAuthScopeCode;
    name: OAuthScopeName;
    createdAt: OAuthScopeCreatedAt;
    updatedAt: OAuthScopeUpdatedAt;
    deletedAt: OAuthScopeDeletedAt;

    // eager relationship

    constructor(
        id: OAuthScopeId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,

    )
    {
        super();
        this.id = id;
        this.code = code;
        this.name = name;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
    }

    static register (
        id: OAuthScopeId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,

    ): OAuthScope
    {
        return new OAuthScope(
            id,
            code,
            name,
            createdAt,
            updatedAt,
            deletedAt,

        );
    }

    created(scope: OAuthScope): void
    {
        this.apply(
            new OAuthCreatedScopeEvent(
                scope.id.value,
                scope.code.value,
                scope.name.value,
                scope.createdAt?.value,
                scope.updatedAt?.value,
                scope.deletedAt?.value,
            ),
        );
    }

    updated(scope: OAuthScope): void
    {
        this.apply(
            new OAuthUpdatedScopeEvent(
                scope.id?.value,
                scope.code?.value,
                scope.name?.value,
                scope.createdAt?.value,
                scope.updatedAt?.value,
                scope.deletedAt?.value,
            ),
        );
    }

    deleted(scope: OAuthScope): void
    {
        this.apply(
            new OAuthDeletedScopeEvent(
                scope.id.value,
                scope.code.value,
                scope.name.value,
                scope.createdAt?.value,
                scope.updatedAt?.value,
                scope.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
        };
    }
}
