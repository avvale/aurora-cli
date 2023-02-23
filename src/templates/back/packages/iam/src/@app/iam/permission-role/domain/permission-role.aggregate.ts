import { LiteralObject } from '@nestjs/common';
import { AggregateRoot } from '@nestjs/cqrs';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from './value-objects';
import { DeletedPermissionRoleEvent } from '../application/events/deleted-permission-role.event';
import { UpdatedPermissionRoleEvent } from '../application/events/updated-permission-role.event';
import { CreatedPermissionRoleEvent } from '../application/events/created-permission-role.event';
import { IamPermission } from '@app/iam/permission/domain/permission.aggregate';
import { IamRole } from '@app/iam/role/domain/role.aggregate';

export class IamPermissionRole extends AggregateRoot
{
    permissionId: PermissionRolePermissionId;
    roleId: PermissionRoleRoleId;

    // eager relationship
    permission: IamPermission;
    role: IamRole;

    constructor(
        permissionId?: PermissionRolePermissionId,
        roleId?: PermissionRoleRoleId,

        permission?: IamPermission,
        role?: IamRole,
    )
    {
        super();

        this.permissionId = permissionId;
        this.roleId = roleId;

        // eager relationship
        this.permission = permission;
        this.role = role;
    }

    static register (
        permissionId: PermissionRolePermissionId,
        roleId: PermissionRoleRoleId,

        permission?: IamPermission,
        role?: IamRole,
    ): IamPermissionRole
    {
        return new IamPermissionRole(
            permissionId,
            roleId,

            permission,
            role,
        );
    }

    created(permissionRole: IamPermissionRole): void
    {
        this.apply(
            new CreatedPermissionRoleEvent(
                permissionRole.permissionId.value,
                permissionRole.roleId.value,
            ),
        );
    }

    updated(permissionRole: IamPermissionRole): void
    {
        this.apply(
            new UpdatedPermissionRoleEvent(
                permissionRole.permissionId?.value,
                permissionRole.roleId?.value,
            ),
        );
    }

    deleted(permissionRole: IamPermissionRole): void
    {
        this.apply(
            new DeletedPermissionRoleEvent(
                permissionRole.permissionId.value,
                permissionRole.roleId.value,
            ),
        );
    }

    toDTO(): LiteralObject
    {
        return {
            permissionId: this.permissionId.value,
            roleId      : this.roleId.value,

            // eager relationship
            permission: this.permission?.toDTO(),
            role      : this.role?.toDTO(),
        };
    }

    // function called to get data for repository side effect methods
    toRepository(): LiteralObject
    {
        return {
            permissionId: this.permissionId.value,
            roleId      : this.roleId.value,

            // eager relationship
            permission: this.permission?.toDTO(),
            role      : this.role?.toDTO(),
        };
    }
}