import { AggregateRoot } from '@nestjs/cqrs';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';
import { CreatedPermissionRoleEvent } from './created-permission-role.event';
import { CreatedPermissionsRolesEvent } from './created-permissions-roles.event';
/* 
import { UpdatedPermissionEvent } from './updated-permission.event';
import { UpdatedPermissionsEvent } from './updated-permissions.event';
import { DeletedPermissionEvent } from './deleted-permission.event';
import { DeletedPermissionsEvent } from './deleted-permissions.event'; */

export class AddPermissionsRolesContextEvent extends AggregateRoot
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
            new CreatedPermissionsRolesEvent(
                this.aggregateRoots.map(permissionRole =>
                    new CreatedPermissionRoleEvent(
                        permissionRole.permissionId.value,
                        permissionRole.roleId.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        /* this.apply(
            new UpdatedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new UpdatedPermissionRoleEvent(
                        permission.id.value,
                        permission.name.value,
                        permission.boundedContextId.value,
                        permission.roleIds?.value,
                        permission.createdAt?.value,
                        permission.updatedAt?.value,
                        permission.deletedAt?.value,
                    ),
                ),
            ),
        ); */
    }

    deleted(): void
    {
        /* this.apply(
            new DeletedPermissionsRolesEvent(
                this.aggregateRoots.map(permission =>
                    new DeletedPermissionRoleEvent(
                        permission.id.value,
                        permission.name.value,
                        permission.boundedContextId.value,
                        permission.roleIds?.value,
                        permission.createdAt?.value,
                        permission.updatedAt?.value,
                        permission.deletedAt?.value,
                    ),
                ),
            ),
        ); */
    }
}