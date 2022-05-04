/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    ScopeId,
    ScopeCode,
    ScopeName,
    ScopeCreatedAt,
    ScopeUpdatedAt,
    ScopeDeletedAt,
} from './value-objects';
import { CreatedScopeEvent } from '../application/events/created-scope.event';
import { UpdatedScopeEvent } from '../application/events/updated-scope.event';
import { DeletedScopeEvent } from '../application/events/deleted-scope.event';

export class OAuthScope extends AggregateRoot
{
    id: ScopeId;
    code: ScopeCode;
    name: ScopeName;
    createdAt: ScopeCreatedAt;
    updatedAt: ScopeUpdatedAt;
    deletedAt: ScopeDeletedAt;

    // eager relationship

    constructor(
        id: ScopeId,
        code: ScopeCode,
        name: ScopeName,
        createdAt: ScopeCreatedAt,
        updatedAt: ScopeUpdatedAt,
        deletedAt: ScopeDeletedAt,

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
        id: ScopeId,
        code: ScopeCode,
        name: ScopeName,
        createdAt: ScopeCreatedAt,
        updatedAt: ScopeUpdatedAt,
        deletedAt: ScopeDeletedAt,

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
            new CreatedScopeEvent(
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
            new UpdatedScopeEvent(
                scope.id.value,
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
            new DeletedScopeEvent(
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


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
