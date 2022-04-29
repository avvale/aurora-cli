import { AggregateRoot } from '@nestjs/cqrs';
import { IamAccount } from '../../domain/account.aggregate';
import { CreatedAccountEvent } from './created-account.event';
import { CreatedAccountsEvent } from './created-accounts.event';
import { DeletedAccountEvent } from './deleted-account.event';
import { DeletedAccountsEvent } from './deleted-accounts.event';

export class AddAccountsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamAccount[] = [],
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
            new CreatedAccountsEvent(
                this.aggregateRoots.map(account =>
                    new CreatedAccountEvent(
                        account.id.value,
                        account.type.value,
                        account.email.value,
                        account.isActive.value,
                        account.clientId.value,
                        account.dApplicationCodes.value,
                        account.dPermissions.value,
                        account.dTenants.value,
                        account.data?.value,
                        account.roleIds?.value,
                        account.tenantIds?.value,
                        account.createdAt?.value,
                        account.updatedAt?.value,
                        account.deletedAt?.value,
                    )
                )
            )
        );
    }

    deleted()
    {
        this.apply(
            new DeletedAccountsEvent(
                this.aggregateRoots.map(account =>
                    new DeletedAccountEvent(
                        account.id.value,
                        account.type.value,
                        account.email.value,
                        account.isActive.value,
                        account.clientId.value,
                        account.dApplicationCodes.value,
                        account.dPermissions.value,
                        account.dTenants.value,
                        account.data?.value,
                        account.roleIds?.value,
                        account.tenantIds?.value,
                        account.createdAt?.value,
                        account.updatedAt?.value,
                        account.deletedAt?.value,
                    )
                )
            )
        );
    }
}