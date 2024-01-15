/* eslint-disable key-spacing */
import { OAuthCreatedScopeEvent, OAuthDeletedScopeEvent, OAuthUpdatedScopeEvent } from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
    OAuthScopeUpdatedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthScope extends AggregateRoot
{
    id: OAuthScopeId;
    code: OAuthScopeCode;
    name: OAuthScopeName;
    roleIds: OAuthScopeRoleIds;
    createdAt: OAuthScopeCreatedAt;
    updatedAt: OAuthScopeUpdatedAt;
    deletedAt: OAuthScopeDeletedAt;

    constructor(
        id: OAuthScopeId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        roleIds: OAuthScopeRoleIds,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,
    )
    {
        super();
        this.id = id;
        this.code = code;
        this.name = name;
        this.roleIds = roleIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: OAuthScopeId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        roleIds: OAuthScopeRoleIds,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,
    ): OAuthScope
    {
        return new OAuthScope(
            id,
            code,
            name,
            roleIds,
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
                scope.roleIds?.value,
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
                scope.roleIds?.value,
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
                scope.roleIds?.value,
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
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            code: this.code.value,
            name: this.name.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }
}
