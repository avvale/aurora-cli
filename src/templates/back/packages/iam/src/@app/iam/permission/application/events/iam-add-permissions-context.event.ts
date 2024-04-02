import { IamCreatedPermissionEvent, IamCreatedPermissionsEvent, IamDeletedPermissionEvent, IamDeletedPermissionsEvent, IamPermission, IamUpdatedAndIncrementedPermissionEvent, IamUpdatedAndIncrementedPermissionsEvent, IamUpdatedPermissionEvent, IamUpdatedPermissionsEvent } from '@app/iam/permission';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddPermissionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamPermission[] = [],
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
            new IamCreatedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new IamCreatedPermissionEvent(
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
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new IamUpdatedPermissionEvent(
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
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new IamUpdatedAndIncrementedPermissionEvent(
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
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new IamDeletedPermissionEvent(
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
        );
    }
}
