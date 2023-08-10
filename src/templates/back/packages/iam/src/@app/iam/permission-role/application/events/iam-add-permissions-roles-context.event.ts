import { AggregateRoot } from '@nestjs/cqrs';
import { IamCreatedPermissionRoleEvent, IamCreatedPermissionsRolesEvent, IamPermissionRole } from '@app/iam/permission-role';

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
        /**/
    }

    deleted(): void
    {
        /**/
    }
}