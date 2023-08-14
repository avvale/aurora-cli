import { AggregateRoot } from '@nestjs/cqrs';
import { IamPermission } from '../../domain/iam-permission.aggregate';
import { IamCreatedPermissionEvent } from './iam-created-permission.event';
import { IamCreatedPermissionsEvent } from './iam-created-permissions.event';
import { IamUpdatedPermissionEvent } from './iam-updated-permission.event';
import { IamUpdatedPermissionsEvent } from './iam-updated-permissions.event';
import { IamDeletedPermissionEvent } from './iam-deleted-permission.event';
import { IamDeletedPermissionsEvent } from './iam-deleted-permissions.event';

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
