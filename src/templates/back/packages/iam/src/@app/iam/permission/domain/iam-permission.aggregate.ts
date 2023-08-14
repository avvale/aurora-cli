/* eslint-disable key-spacing */
import { AggregateRoot } from '@nestjs/cqrs';
import { LiteralObject, Utils } from '@aurorajs.dev/core';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from './value-objects';
import { IamCreatedPermissionEvent } from '../application/events/iam-created-permission.event';
import { IamUpdatedPermissionEvent } from '../application/events/iam-updated-permission.event';
import { IamDeletedPermissionEvent } from '../application/events/iam-deleted-permission.event';
import { IamBoundedContext } from '@app/iam/bounded-context';
import { IamRole } from '@app/iam/role';

export class IamPermission extends AggregateRoot
{
    id: IamPermissionId;
    name: IamPermissionName;
    boundedContextId: IamPermissionBoundedContextId;
    roleIds: IamPermissionRoleIds;
    createdAt: IamPermissionCreatedAt;
    updatedAt: IamPermissionUpdatedAt;
    deletedAt: IamPermissionDeletedAt;

    // eager relationship
    boundedContext: IamBoundedContext;
    roles: IamRole[];

    constructor(
        id: IamPermissionId,
        name: IamPermissionName,
        boundedContextId: IamPermissionBoundedContextId,
        roleIds: IamPermissionRoleIds,
        createdAt: IamPermissionCreatedAt,
        updatedAt: IamPermissionUpdatedAt,
        deletedAt: IamPermissionDeletedAt,

        boundedContext?: IamBoundedContext,
        roles?: IamRole[],
    )
    {
        super();
        this.id = id;
        this.name = name;
        this.boundedContextId = boundedContextId;
        this.roleIds = roleIds;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;

        // eager relationship
        this.boundedContext = boundedContext;
        this.roles = roles;
    }

    static register (
        id: IamPermissionId,
        name: IamPermissionName,
        boundedContextId: IamPermissionBoundedContextId,
        roleIds: IamPermissionRoleIds,
        createdAt: IamPermissionCreatedAt,
        updatedAt: IamPermissionUpdatedAt,
        deletedAt: IamPermissionDeletedAt,

        boundedContext?: IamBoundedContext,
        roles?: IamRole[],
    ): IamPermission
    {
        return new IamPermission(
            id,
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

    created(permission: IamPermission): void
    {
        this.apply(
            new IamCreatedPermissionEvent(
                permission.id.value,
                permission.name.value,
                permission.boundedContextId.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            ),
        );
    }

    updated(permission: IamPermission): void
    {
        this.apply(
            new IamUpdatedPermissionEvent(
                permission.id?.value,
                permission.name?.value,
                permission.boundedContextId?.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            ),
        );
    }

    deleted(permission: IamPermission): void
    {
        this.apply(
            new IamDeletedPermissionEvent(
                permission.id.value,
                permission.name.value,
                permission.boundedContextId.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            boundedContextId: this.boundedContextId.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            boundedContext: this.boundedContext?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            id: this.id.value,
            name: this.name.value,
            boundedContextId: this.boundedContextId.value,
            roleIds: this.roleIds?.value,
            createdAt: this.createdAt?.value,
            updatedAt: this.updatedAt?.value,
            deletedAt: this.deletedAt?.value,

            // eager relationship
            boundedContext: this.boundedContext?.toDTO(),
            roles: this.roles?.map(item => item.toDTO()),
        };
    }
}
