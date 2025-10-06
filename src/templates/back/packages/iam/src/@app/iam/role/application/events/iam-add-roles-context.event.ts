import { IamCreatedRoleEvent, IamCreatedRolesEvent, IamDeletedRoleEvent, IamDeletedRolesEvent, IamRole, IamUpdatedRoleEvent, IamUpdatedRolesEvent } from '@app/iam/role';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddRolesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamRole[] = [],
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
            new IamCreatedRolesEvent({
                payload: this.aggregateRoots.map(role =>
                    new IamCreatedRoleEvent({
                        payload: {
                            id: role.id.value,
                            name: role.name.value,
                            isMaster: role.isMaster.value,
                            permissionIds: role.permissionIds?.value,
                            accountIds: role.accountIds?.value,
                            createdAt: role.createdAt?.value,
                            updatedAt: role.updatedAt?.value,
                            deletedAt: role.deletedAt?.value,
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
            new IamUpdatedRolesEvent({
                payload: this.aggregateRoots.map(role =>
                    new IamUpdatedRoleEvent({
                        payload: {
                            id: role.id.value,
                            name: role.name.value,
                            isMaster: role.isMaster.value,
                            permissionIds: role.permissionIds?.value,
                            accountIds: role.accountIds?.value,
                            createdAt: role.createdAt?.value,
                            updatedAt: role.updatedAt?.value,
                            deletedAt: role.deletedAt?.value,
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
            new IamDeletedRolesEvent({
                payload: this.aggregateRoots.map(role =>
                    new IamDeletedRoleEvent({
                        payload: {
                            id: role.id.value,
                            name: role.name.value,
                            isMaster: role.isMaster.value,
                            permissionIds: role.permissionIds?.value,
                            accountIds: role.accountIds?.value,
                            createdAt: role.createdAt?.value,
                            updatedAt: role.updatedAt?.value,
                            deletedAt: role.deletedAt?.value,
                        },
                    }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
