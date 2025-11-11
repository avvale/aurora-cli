/* eslint-disable key-spacing */
import {
    OAuthCreatedScopeEvent,
    OAuthDeletedScopeEvent,
    OAuthUpdatedScopeEvent,
} from '@app/o-auth/scope';
import {
    OAuthScopeCode,
    OAuthScopeCreatedAt,
    OAuthScopeDeletedAt,
    OAuthScopeId,
    OAuthScopeName,
    OAuthScopeRoleIds,
    OAuthScopeRowId,
    OAuthScopeUpdatedAt,
} from '@app/o-auth/scope/domain/value-objects';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class OAuthScope extends AggregateRoot {
    id: OAuthScopeId;
    rowId: OAuthScopeRowId;
    code: OAuthScopeCode;
    name: OAuthScopeName;
    roleIds: OAuthScopeRoleIds;
    createdAt: OAuthScopeCreatedAt;
    updatedAt: OAuthScopeUpdatedAt;
    deletedAt: OAuthScopeDeletedAt;

    constructor(
        id: OAuthScopeId,
        rowId: OAuthScopeRowId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        roleIds: OAuthScopeRoleIds,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.code = code;
        this.name = name;
        this.roleIds = roleIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }

    static register(
        id: OAuthScopeId,
        rowId: OAuthScopeRowId,
        code: OAuthScopeCode,
        name: OAuthScopeName,
        roleIds: OAuthScopeRoleIds,
        createdAt: OAuthScopeCreatedAt,
        updatedAt: OAuthScopeUpdatedAt,
        deletedAt: OAuthScopeDeletedAt,
    ): OAuthScope {
        return new OAuthScope(
            id,
            rowId,
            code,
            name,
            roleIds,
            createdAt,
            updatedAt,
            deletedAt,
        );
    }

    created(event: { payload: OAuthScope; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthCreatedScopeEvent({
                payload: {
                    id: event.payload.id.value,
                    code: event.payload.code.value,
                    name: event.payload.name.value,
                    roleIds: event.payload.roleIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: OAuthScope; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthUpdatedScopeEvent({
                payload: {
                    id: event.payload.id?.value,
                    code: event.payload.code?.value,
                    name: event.payload.name?.value,
                    roleIds: event.payload.roleIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: OAuthScope; cQMetadata?: CQMetadata }): void {
        this.apply(
            new OAuthDeletedScopeEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    code: event.payload.code.value,
                    name: event.payload.name.value,
                    roleIds: event.payload.roleIds?.value,
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
            code: this.code.value,
            name: this.name.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
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
