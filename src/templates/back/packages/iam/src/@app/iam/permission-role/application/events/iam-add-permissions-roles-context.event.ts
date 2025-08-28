import { IamCreatedPermissionRoleEvent, IamCreatedPermissionsRolesEvent, IamDeletedPermissionRoleEvent, IamDeletedPermissionsRolesEvent, IamPermissionRole, IamUpdatedPermissionRoleEvent, IamUpdatedPermissionsRolesEvent } from '@app/iam/permission-role';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddPermissionsRolesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamPermissionRole[] = [],
        public readonly cQMetadata?: CQMetadata,
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
            new IamCreatedPermissionsRolesEvent({
                payload: this.aggregateRoots.map(permissionRole =>
                    new IamCreatedPermissionRoleEvent({
                        payload: {
                            permissionId: permissionRole.permissionId.value,
                            roleId: permissionRole.roleId.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedPermissionsRolesEvent({
                payload: this.aggregateRoots.map(permissionRole =>
                    new IamUpdatedPermissionRoleEvent({
                        payload: {
                            permissionId: permissionRole.permissionId.value,
                            roleId: permissionRole.roleId.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedPermissionsRolesEvent({
                payload: this.aggregateRoots.map(permissionRole =>
                    new IamDeletedPermissionRoleEvent({
                        payload: {
                            permissionId: permissionRole.permissionId.value,
                            roleId: permissionRole.roleId.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
