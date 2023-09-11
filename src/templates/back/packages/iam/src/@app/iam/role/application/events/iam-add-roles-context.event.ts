import { IamCreatedRoleEvent, IamCreatedRolesEvent, IamDeletedRoleEvent, IamDeletedRolesEvent, IamRole, IamUpdatedRoleEvent, IamUpdatedRolesEvent } from '@app/iam/role';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddRolesContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamRole[] = [],
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
            new IamCreatedRolesEvent(
                this.aggregateRoots.map(role =>
                    new IamCreatedRoleEvent(
                        role.id.value,
                        role.name.value,
                        role.isMaster.value,
                        role.permissionIds?.value,
                        role.accountIds?.value,
                        role.createdAt?.value,
                        role.updatedAt?.value,
                        role.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedRolesEvent(
                this.aggregateRoots.map(role =>
                    new IamUpdatedRoleEvent(
                        role.id.value,
                        role.name.value,
                        role.isMaster.value,
                        role.permissionIds?.value,
                        role.accountIds?.value,
                        role.createdAt?.value,
                        role.updatedAt?.value,
                        role.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedRolesEvent(
                this.aggregateRoots.map(role =>
                    new IamDeletedRoleEvent(
                        role.id.value,
                        role.name.value,
                        role.isMaster.value,
                        role.permissionIds?.value,
                        role.accountIds?.value,
                        role.createdAt?.value,
                        role.updatedAt?.value,
                        role.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
