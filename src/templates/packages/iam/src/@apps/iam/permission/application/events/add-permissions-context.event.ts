import { AggregateRoot } from '@nestjs/cqrs';
import { IamPermission } from '../../domain/permission.aggregate';
import { CreatedPermissionEvent } from './created-permission.event';
import { CreatedPermissionsEvent } from './created-permissions.event';
import { DeletedPermissionEvent } from './deleted-permission.event';
import { DeletedPermissionsEvent } from './deleted-permissions.event';

export class AddPermissionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamPermission[] = [],
    ) {
        super();
    }

    *[Symbol.iterator]()
    {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created()
    {
        this.apply(
            new CreatedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new CreatedPermissionEvent(
                        permission.id.value,
                        permission.name.value,
                        permission.boundedContextId.value,
                        permission.roleIds?.value,
                        permission.createdAt?.value,
                        permission.updatedAt?.value,
                        permission.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedPermissionsEvent(
                this.aggregateRoots.map(permission =>
                    new DeletedPermissionEvent(
                        permission.id.value,
                        permission.name.value,
                        permission.boundedContextId.value,
                        permission.roleIds?.value,
                        permission.createdAt?.value,
                        permission.updatedAt?.value,
                        permission.deletedAt?.value,
                    )
                )
            )
        );
    }
}