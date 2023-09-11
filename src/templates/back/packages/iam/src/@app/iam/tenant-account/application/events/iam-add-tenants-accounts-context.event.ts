import { IamCreatedTenantAccountEvent, IamCreatedTenantsAccountsEvent, IamDeletedTenantAccountEvent, IamDeletedTenantsAccountsEvent, IamTenantAccount, IamUpdatedTenantAccountEvent, IamUpdatedTenantsAccountsEvent } from '@app/iam/tenant-account';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddTenantsAccountsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamTenantAccount[] = [],
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
            new IamCreatedTenantsAccountsEvent(
                this.aggregateRoots.map(tenantAccount =>
                    new IamCreatedTenantAccountEvent(
                        tenantAccount.tenantId.value,
                        tenantAccount.accountId.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedTenantsAccountsEvent(
                this.aggregateRoots.map(tenantAccount =>
                    new IamUpdatedTenantAccountEvent(
                        tenantAccount.tenantId.value,
                        tenantAccount.accountId.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedTenantsAccountsEvent(
                this.aggregateRoots.map(tenantAccount =>
                    new IamDeletedTenantAccountEvent(
                        tenantAccount.tenantId.value,
                        tenantAccount.accountId.value,
                    ),
                ),
            ),
        );
    }
}
