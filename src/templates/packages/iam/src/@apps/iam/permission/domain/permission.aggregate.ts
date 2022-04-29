/* eslint-disable key-spacing */
import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import { Utils } from 'aurora-ts-core';
import {
    PermissionId,
    PermissionName,
    PermissionBoundedContextId,
    PermissionRoleIds,
    PermissionCreatedAt,
    PermissionUpdatedAt,
    PermissionDeletedAt,
} from './value-objects';
import { CreatedPermissionEvent } from '../application/events/created-permission.event';
import { UpdatedPermissionEvent } from '../application/events/updated-permission.event';
import { DeletedPermissionEvent } from '../application/events/deleted-permission.event';
import { IamBoundedContext } from '../../../../@apps/iam/bounded-context/domain/bounded-context.aggregate';
import { IamRole } from '../../../../@apps/iam/role/domain/role.aggregate';

export class IamPermission extends AggregateRoot
{
    id: PermissionId;
    name: PermissionName;
    boundedContextId: PermissionBoundedContextId;
    roleIds: PermissionRoleIds;
    createdAt: PermissionCreatedAt;
    updatedAt: PermissionUpdatedAt;
    deletedAt: PermissionDeletedAt;

    // eager relationship
    boundedContext: IamBoundedContext;
    roles: IamRole[];

    constructor(
        id: PermissionId,
        name: PermissionName,
        boundedContextId: PermissionBoundedContextId,
        roleIds: PermissionRoleIds,
        createdAt: PermissionCreatedAt,
        updatedAt: PermissionUpdatedAt,
        deletedAt: PermissionDeletedAt,

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
        id: PermissionId,
        name: PermissionName,
        boundedContextId: PermissionBoundedContextId,
        roleIds: PermissionRoleIds,
        createdAt: PermissionCreatedAt,
        updatedAt: PermissionUpdatedAt,
        deletedAt: PermissionDeletedAt,

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
            new CreatedPermissionEvent(
                permission.id.value,
                permission.name.value,
                permission.boundedContextId.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            )
        );
    }

    updated(permission: IamPermission): void
    {
        this.apply(
            new UpdatedPermissionEvent(
                permission.id.value,
                permission.name?.value,
                permission.boundedContextId?.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            )
        );
    }

    deleted(permission: IamPermission): void
    {
        this.apply(
            new DeletedPermissionEvent(
                permission.id.value,
                permission.name.value,
                permission.boundedContextId.value,
                permission.roleIds?.value,
                permission.createdAt?.value,
                permission.updatedAt?.value,
                permission.deletedAt?.value,
            )
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


    toI18nDTO(): LiteralObject
    {
        return {
        };
    }
}
