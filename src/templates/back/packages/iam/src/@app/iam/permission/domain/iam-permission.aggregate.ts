/* eslint-disable key-spacing */
import { IamBoundedContext } from '@app/iam/bounded-context';
import {
    IamCreatedPermissionEvent,
    IamDeletedPermissionEvent,
    IamUpdatedPermissionEvent,
} from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionCreatedAt,
    IamPermissionDeletedAt,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionRowId,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { IamRole } from '@app/iam/role';
import { CQMetadata, LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamPermission extends AggregateRoot {
    id: IamPermissionId;
    rowId: IamPermissionRowId;
    name: IamPermissionName;
    boundedContextId: IamPermissionBoundedContextId;
    roleIds: IamPermissionRoleIds;
    createdAt: IamPermissionCreatedAt;
    updatedAt: IamPermissionUpdatedAt;
    deletedAt: IamPermissionDeletedAt;
    boundedContext: IamBoundedContext;
    roles: IamRole[];

    constructor(
        id: IamPermissionId,
        rowId: IamPermissionRowId,
        name: IamPermissionName,
        boundedContextId: IamPermissionBoundedContextId,
        roleIds: IamPermissionRoleIds,
        createdAt: IamPermissionCreatedAt,
        updatedAt: IamPermissionUpdatedAt,
        deletedAt: IamPermissionDeletedAt,
        boundedContext?: IamBoundedContext,
        roles?: IamRole[],
    ) {
        super();
        this.id = id;
        this.rowId = rowId;
        this.name = name;
        this.boundedContextId = boundedContextId;
        this.roleIds = roleIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.boundedContext = boundedContext;
        this.roles = roles;
    }

    static register(
        id: IamPermissionId,
        rowId: IamPermissionRowId,
        name: IamPermissionName,
        boundedContextId: IamPermissionBoundedContextId,
        roleIds: IamPermissionRoleIds,
        createdAt: IamPermissionCreatedAt,
        updatedAt: IamPermissionUpdatedAt,
        deletedAt: IamPermissionDeletedAt,
        boundedContext?: IamBoundedContext,
        roles?: IamRole[],
    ): IamPermission {
        return new IamPermission(
            id,
            rowId,
            name,
            boundedContextId,
            roleIds,
            createdAt,
            updatedAt,
            deletedAt,
            boundedContext,
            roles,
        );
    }

    created(event: { payload: IamPermission; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamCreatedPermissionEvent({
                payload: {
                    id: event.payload.id.value,
                    name: event.payload.name.value,
                    boundedContextId: event.payload.boundedContextId.value,
                    roleIds: event.payload.roleIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    updated(event: { payload: IamPermission; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamUpdatedPermissionEvent({
                payload: {
                    id: event.payload.id?.value,
                    name: event.payload.name?.value,
                    boundedContextId: event.payload.boundedContextId?.value,
                    roleIds: event.payload.roleIds?.value,
                    createdAt: event.payload.createdAt?.value,
                    updatedAt: event.payload.updatedAt?.value,
                    deletedAt: event.payload.deletedAt?.value,
                },
                cQMetadata: event.cQMetadata,
            }),
        );
    }

    deleted(event: { payload: IamPermission; cQMetadata?: CQMetadata }): void {
        this.apply(
            new IamDeletedPermissionEvent({
                payload: {
                    id: event.payload.id.value,
                    rowId: event.payload.rowId.value,
                    name: event.payload.name.value,
                    boundedContextId: event.payload.boundedContextId.value,
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
            name: this.name.value,
            boundedContextId: this.boundedContextId.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            boundedContext: this.boundedContext?.toDTO(),
            roles: this.roles?.map((item) => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject {
        return {
            id: this.id.value,
            name: this.name.value,
            boundedContextId: this.boundedContextId.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,
            boundedContext: this.boundedContext?.toDTO(),
            roles: this.roles?.map((item) => item.toDTO()),
        };
    }
}
