import {
    IamAccount,
    IamCreatedAccountEvent,
    IamCreatedAccountsEvent,
    IamDeletedAccountEvent,
    IamDeletedAccountsEvent,
    IamUpdatedAccountEvent,
    IamUpdatedAccountsEvent,
} from '@app/iam/account';
import { CQMetadata } from '@aurorajs.dev/core';
import { AggregateRoot } from '@nestjs/cqrs';

export class IamAddAccountsContextEvent extends AggregateRoot {
    constructor(
        public readonly aggregateRoots: IamAccount[] = [],
        public readonly cQMetadata?: CQMetadata,
    ) {
        super();
    }

    *[Symbol.iterator]() {
        for (const aggregateRoot of this.aggregateRoots) yield aggregateRoot;
    }

    created(): void {
        this.apply(
            new IamCreatedAccountsEvent({
                payload: this.aggregateRoots.map(
                    (account) =>
                        new IamCreatedAccountEvent({
                            payload: {
                                id: account.id.value,
                                type: account.type.value,
                                code: account.code?.value,
                                email: account.email?.value,
                                username: account.username.value,
                                isActive: account.isActive.value,
                                clientId: account.clientId.value,
                                tags: account.tags?.value,
                                scopes: account.scopes?.value,
                                dApplicationCodes:
                                    account.dApplicationCodes.value,
                                dPermissions: account.dPermissions.value,
                                dTenants: account.dTenants.value,
                                meta: account.meta?.value,
                                roleIds: account.roleIds?.value,
                                tenantIds: account.tenantIds?.value,
                                createdAt: account.createdAt?.value,
                                updatedAt: account.updatedAt?.value,
                                deletedAt: account.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    updated(): void {
        this.apply(
            new IamUpdatedAccountsEvent({
                payload: this.aggregateRoots.map(
                    (account) =>
                        new IamUpdatedAccountEvent({
                            payload: {
                                id: account.id.value,
                                type: account.type.value,
                                code: account.code?.value,
                                email: account.email?.value,
                                username: account.username.value,
                                isActive: account.isActive.value,
                                clientId: account.clientId.value,
                                tags: account.tags?.value,
                                scopes: account.scopes?.value,
                                dApplicationCodes:
                                    account.dApplicationCodes.value,
                                dPermissions: account.dPermissions.value,
                                dTenants: account.dTenants.value,
                                meta: account.meta?.value,
                                roleIds: account.roleIds?.value,
                                tenantIds: account.tenantIds?.value,
                                createdAt: account.createdAt?.value,
                                updatedAt: account.updatedAt?.value,
                                deletedAt: account.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }

    deleted(): void {
        this.apply(
            new IamDeletedAccountsEvent({
                payload: this.aggregateRoots.map(
                    (account) =>
                        new IamDeletedAccountEvent({
                            payload: {
                                id: account.id.value,
                                rowId: account.rowId.value,
                                type: account.type.value,
                                code: account.code?.value,
                                email: account.email?.value,
                                username: account.username.value,
                                isActive: account.isActive.value,
                                clientId: account.clientId.value,
                                tags: account.tags?.value,
                                scopes: account.scopes?.value,
                                dApplicationCodes:
                                    account.dApplicationCodes.value,
                                dPermissions: account.dPermissions.value,
                                dTenants: account.dTenants.value,
                                meta: account.meta?.value,
                                roleIds: account.roleIds?.value,
                                tenantIds: account.tenantIds?.value,
                                createdAt: account.createdAt?.value,
                                updatedAt: account.updatedAt?.value,
                                deletedAt: account.deletedAt?.value,
                            },
                        }),
                ),
                cQMetadata: this.cQMetadata,
            }),
        );
    }
}
