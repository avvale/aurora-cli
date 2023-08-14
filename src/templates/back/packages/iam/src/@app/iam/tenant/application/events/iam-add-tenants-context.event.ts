import { AggregateRoot } from '@nestjs/cqrs';
import { IamTenant } from '../../domain/iam-tenant.aggregate';
import { IamCreatedTenantEvent } from './iam-created-tenant.event';
import { IamCreatedTenantsEvent } from './iam-created-tenants.event';
import { IamUpdatedTenantEvent } from './iam-updated-tenant.event';
import { IamUpdatedTenantsEvent } from './iam-updated-tenants.event';
import { IamDeletedTenantEvent } from './iam-deleted-tenant.event';
import { IamDeletedTenantsEvent } from './iam-deleted-tenants.event';

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
