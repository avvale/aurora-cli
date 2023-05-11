import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IAccountRepository } from '@app/iam/account/domain/account.repository';
import {
    AccountId,
    AccountType,
    AccountCode,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountScopes,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountMeta,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '@app/iam/account/domain/value-objects';
import { IamAccount } from '../../domain/account.aggregate';
import { accounts } from './mock-account.data';

@Injectable()
export class MockAccountRepository extends MockRepository<IamAccount> implements IAccountRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamAccount';
    public collectionSource: IamAccount[];
    public deletedAtInstance: AccountDeletedAt = new AccountDeletedAt(null);

    constructor()
    {
        super();
        this.createSourceMockData();
    }

    public reset(): void
    {
        this.createSourceMockData();
    }

    private createSourceMockData(): void
    {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>accounts)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamAccount.register(
                new AccountId(itemCollection.id),
                new AccountType(itemCollection.type),
                new AccountCode(itemCollection.code),
                new AccountEmail(itemCollection.email),
                new AccountIsActive(itemCollection.isActive),
                new AccountClientId(itemCollection.clientId),
                new AccountScopes(itemCollection.scopes),
                new AccountDApplicationCodes(itemCollection.dApplicationCodes),
                new AccountDPermissions(itemCollection.dPermissions),
                new AccountDTenants(itemCollection.dTenants),
                new AccountMeta(itemCollection.meta),
                new AccountRoleIds(itemCollection.roleIds),
                new AccountTenantIds(itemCollection.tenantIds),
                new AccountCreatedAt(itemCollection.createdAt),
                new AccountUpdatedAt(itemCollection.updatedAt),
                new AccountDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}