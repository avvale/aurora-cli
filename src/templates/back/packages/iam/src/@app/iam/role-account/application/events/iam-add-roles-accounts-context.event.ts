import { IamCreatedRoleAccountEvent, IamCreatedRolesAccountsEvent, IamDeletedRoleAccountEvent, IamDeletedRolesAccountsEvent, IamRoleAccount, IamUpdatedAndIncrementedRoleAccountEvent, IamUpdatedAndIncrementedRolesAccountsEvent, IamUpdatedRoleAccountEvent, IamUpdatedRolesAccountsEvent } from '@app/iam/role-account';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddRolesAccountsContextEvent extends AggregateRoot
{
    constructor(
        public readonly aggregateRoots: IamRoleAccount[] = [],
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
            new IamCreatedRolesAccountsEvent(
                this.aggregateRoots.map(roleAccount =>
                    new IamCreatedRoleAccountEvent(
                        roleAccount.roleId.value,
                        roleAccount.accountId.value,
                    ),
                ),
            ),
        );
    }

    updated(): void
    {
        this.apply(
            new IamUpdatedRolesAccountsEvent(
                this.aggregateRoots.map(roleAccount =>
                    new IamUpdatedRoleAccountEvent(
                        roleAccount.roleId.value,
                        roleAccount.accountId.value,
                    ),
                ),
            ),
        );
    }

    updatedAndIncremented(): void
    {
        this.apply(
            new IamUpdatedAndIncrementedRolesAccountsEvent(
                this.aggregateRoots.map(roleAccount =>
                    new IamUpdatedAndIncrementedRoleAccountEvent(
                        roleAccount.roleId.value,
                        roleAccount.accountId.value,
                    ),
                ),
            ),
        );
    }

    deleted(): void
    {
        this.apply(
            new IamDeletedRolesAccountsEvent(
                this.aggregateRoots.map(roleAccount =>
                    new IamDeletedRoleAccountEvent(
                        roleAccount.roleId.value,
                        roleAccount.accountId.value,
                    ),
                ),
            ),
        );
    }
}
