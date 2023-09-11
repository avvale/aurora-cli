import { IamAccount, IamCreatedAccountEvent, IamCreatedAccountsEvent, IamDeletedAccountEvent, IamDeletedAccountsEvent, IamUpdatedAccountEvent, IamUpdatedAccountsEvent } from '@app/iam/account';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddAccountsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamAccount[] = [],
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
            new IamCreatedAccountsEvent(
                this.aggregateRoots.map(account =>
                    new IamCreatedAccountEvent(
                        account.id.value,
                        account.type.value,
                        account.code?.value,
                        account.email.value,
                        account.isActive.value,
                        account.clientId.value,
                        account.scopes?.value,
                        account.dApplicationCodes.value,
                        account.dPermissions.value,
                        account.dTenants.value,
                        account.meta?.value,
                        account.roleIds?.value,
                        account.tenantIds?.value,
                        account.createdAt?.value,
                        account.updatedAt?.value,
                        account.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedAccountsEvent(
                this.aggregateRoots.map(account =>
                    new IamUpdatedAccountEvent(
                        account.id.value,
                        account.type.value,
                        account.code?.value,
                        account.email.value,
                        account.isActive.value,
                        account.clientId.value,
                        account.scopes?.value,
                        account.dApplicationCodes.value,
                        account.dPermissions.value,
                        account.dTenants.value,
                        account.meta?.value,
                        account.roleIds?.value,
                        account.tenantIds?.value,
                        account.createdAt?.value,
                        account.updatedAt?.value,
                        account.deletedAt?.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedAccountsEvent(
                this.aggregateRoots.map(account =>
                    new IamDeletedAccountEvent(
                        account.id.value,
                        account.type.value,
                        account.code?.value,
                        account.email.value,
                        account.isActive.value,
                        account.clientId.value,
                        account.scopes?.value,
                        account.dApplicationCodes.value,
                        account.dPermissions.value,
                        account.dTenants.value,
                        account.meta?.value,
                        account.roleIds?.value,
                        account.tenantIds?.value,
                        account.createdAt?.value,
                        account.updatedAt?.value,
                        account.deletedAt?.value,
                    ),
                ),
            ),
        );
    }
}
