import { AggregateRoot } from '@nestjs/cqrs';
import { IamRole } from '../../domain/role.aggregate';
import { CreatedRoleEvent } from './created-role.event';
import { CreatedRolesEvent } from './created-roles.event';
import { UpdatedRoleEvent } from './updated-role.event';
import { UpdatedRolesEvent } from './updated-roles.event';
import { DeletedRoleEvent } from './deleted-role.event';
import { DeletedRolesEvent } from './deleted-roles.event';

export class AddRolesContextEvent extends AggregateRoot
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
            new CreatedRolesEvent(
                this.aggregateRoots.map(role =>
                    new CreatedRoleEvent(
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
            new UpdatedRolesEvent(
                this.aggregateRoots.map(role =>
                    new UpdatedRoleEvent(
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
            new DeletedRolesEvent(
                this.aggregateRoots.map(role =>
                    new DeletedRoleEvent(
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