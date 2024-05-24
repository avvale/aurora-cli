import { IamCreatedPermissionEvent, IamCreatedPermissionsEvent, IamDeletedPermissionEvent, IamDeletedPermissionsEvent, IamPermission, IamUpdatedAndIncrementedPermissionEvent, IamUpdatedAndIncrementedPermissionsEvent, IamUpdatedPermissionEvent, IamUpdatedPermissionsEvent } from '@app/iam/permission';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddPermissionsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamPermission[] = [],
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
            new IamCreatedPermissionsEvent({
                payload: this.aggregateRoots.map(permission =>
                    new IamCreatedPermissionEvent({
                        payload: {
                            id: permission.id.value,
                            name: permission.name.value,
                            boundedContextId: permission.boundedContextId.value,
                            roleIds: permission.roleIds?.value,
                            createdAt: permission.createdAt?.value,
                            updatedAt: permission.updatedAt?.value,
                            deletedAt: permission.deletedAt?.value,
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
            new IamUpdatedPermissionsEvent({
                payload: this.aggregateRoots.map(permission =>
                    new IamUpdatedPermissionEvent({
                        payload: {
                            id: permission.id.value,
                            name: permission.name.value,
                            boundedContextId: permission.boundedContextId.value,
                            roleIds: permission.roleIds?.value,
                            createdAt: permission.createdAt?.value,
                            updatedAt: permission.updatedAt?.value,
                            deletedAt: permission.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedPermissionsEvent({
                payload: this.aggregateRoots.map(permission =>
                    new IamUpdatedAndIncrementedPermissionEvent({
                        payload: {
                            id: permission.id.value,
                            name: permission.name.value,
                            boundedContextId: permission.boundedContextId.value,
                            roleIds: permission.roleIds?.value,
                            createdAt: permission.createdAt?.value,
                            updatedAt: permission.updatedAt?.value,
                            deletedAt: permission.deletedAt?.value,
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
            new IamDeletedPermissionsEvent({
                payload: this.aggregateRoots.map(permission =>
                    new IamDeletedPermissionEvent({
                        payload: {
                            id: permission.id.value,
                            name: permission.name.value,
                            boundedContextId: permission.boundedContextId.value,
                            roleIds: permission.roleIds?.value,
                            createdAt: permission.createdAt?.value,
                            updatedAt: permission.updatedAt?.value,
                            deletedAt: permission.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
