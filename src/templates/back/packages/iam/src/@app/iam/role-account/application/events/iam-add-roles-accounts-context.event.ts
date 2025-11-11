import {
    IamCreatedRoleAccountEvent,
    IamCreatedRolesAccountsEvent,
    IamDeletedRoleAccountEvent,
    IamDeletedRolesAccountsEvent,
    IamRoleAccount,
    IamUpdatedRoleAccountEvent,
    IamUpdatedRolesAccountsEvent,
} from '@app/iam/role-account';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddRolesAccountsContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: IamRoleAccount[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new IamCreatedRolesAccountsEvent({
                payload: this.aggregateRoots.map(
                    (roleAccount) =>
                        new IamCreatedRoleAccountEvent({
                            payload: {
                                roleId: roleAccount.roleId.value,
                                accountId: roleAccount.accountId.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new IamUpdatedRolesAccountsEvent({
                payload: this.aggregateRoots.map(
                    (roleAccount) =>
                        new IamUpdatedRoleAccountEvent({
                            payload: {
                                roleId: roleAccount.roleId.value,
                                accountId: roleAccount.accountId.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new IamDeletedRolesAccountsEvent({
                payload: this.aggregateRoots.map(
                    (roleAccount) =>
                        new IamDeletedRoleAccountEvent({
                            payload: {
                                roleId: roleAccount.roleId.value,
                                accountId: roleAccount.accountId.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
