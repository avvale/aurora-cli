import { IamPermission } from '@app/iam/permission';
import { IamCreatedPermissionRoleEvent, IamDeletedPermissionRoleEvent, IamUpdatedPermissionRoleEvent } from '@app/iam/permission-role';
import { IamRole } from '@app/iam/role';
import { LiteralObject } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from './value-objects';

export class IamPermissionRole extends AggregateRoot
{
    permissionId: IamPermissionRolePermissionId;
    roleId: IamPermissionRoleRoleId;

    // eager relationship
    permission: IamPermission;
    role: IamRole;

    constructor(
        permissionId?: IamPermissionRolePermissionId,
        roleId?: IamPermissionRoleRoleId,

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
        permissionId: IamPermissionRolePermissionId,
        roleId: IamPermissionRoleRoleId,

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
            new IamCreatedPermissionRoleEvent(
                permissionRole.permissionId.value,
                permissionRole.roleId.value,
            ),
        );
    }

    updated(permissionRole: IamPermissionRole): void
    {
        this.apply(
            new IamUpdatedPermissionRoleEvent(
                permissionRole.permissionId?.value,
                permissionRole.roleId?.value,
            ),
        );
    }

    deleted(permissionRole: IamPermissionRole): void
    {
        this.apply(
            new IamDeletedPermissionRoleEvent(
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