import { IamCreatedTenantEvent, IamCreatedTenantsEvent, IamDeletedTenantEvent, IamDeletedTenantsEvent, IamTenant, IamUpdatedAndIncrementedTenantEvent, IamUpdatedAndIncrementedTenantsEvent, IamUpdatedTenantEvent, IamUpdatedTenantsEvent } from '@app/iam/tenant';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTenantsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamTenant[] = [],
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
            new IamCreatedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new IamCreatedTenantEvent(
                        tenant.id.value,
                        tenant.parentId?.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new IamUpdatedTenantEvent(
                        tenant.id.value,
                        tenant.parentId?.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new IamUpdatedAndIncrementedTenantEvent(
                        tenant.id.value,
                        tenant.parentId?.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedTenantsEvent(
                this.aggregateRoots.map(tenant =>
                    new IamDeletedTenantEvent(
                        tenant.id.value,
                        tenant.parentId?.value,
                        tenant.name.value,
                        tenant.code?.value,
                        tenant.logo?.value,
                        tenant.isActive.value,
                        tenant.meta?.value,
                        tenant.accountIds?.value,
                        tenant.createdAt?.value,
                        tenant.updatedAt?.value,
                        tenant.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
