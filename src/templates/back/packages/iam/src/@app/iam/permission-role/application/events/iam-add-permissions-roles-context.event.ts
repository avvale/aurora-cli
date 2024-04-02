import { IamCreatedPermissionRoleEvent, IamCreatedPermissionsRolesEvent, IamDeletedPermissionRoleEvent, IamDeletedPermissionsRolesEvent, IamPermissionRole, IamUpdatedAndIncrementedPermissionRoleEvent, IamUpdatedAndIncrementedPermissionsRolesEvent, IamUpdatedPermissionRoleEvent, IamUpdatedPermissionsRolesEvent } from '@app/iam/permission-role';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddPermissionsRolesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamPermissionRole[] = [],
    )
    {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void
    {
        this.apply(
            new IamCreatedPermissionsRolesEvent(
                this.aggregateRoots.map(permissionRole =>
                    new IamCreatedPermissionRoleEvent(
                        permissionRole.permissionId.value,
                        permissionRole.roleId.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedPermissionsRolesEvent(
                this.aggregateRoots.map(permissionRole =>
                    new IamUpdatedPermissionRoleEvent(
                        permissionRole.permissionId.value,
                        permissionRole.roleId.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedPermissionsRolesEvent(
                this.aggregateRoots.map(permissionRole =>
                    new IamUpdatedAndIncrementedPermissionRoleEvent(
                        permissionRole.permissionId.value,
                        permissionRole.roleId.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedPermissionsRolesEvent(
                this.aggregateRoots.map(permissionRole =>
                    new IamDeletedPermissionRoleEvent(
                        permissionRole.permissionId.value,
                        permissionRole.roleId.value,
                    ),
                ),
            ),
        );
    }
}
