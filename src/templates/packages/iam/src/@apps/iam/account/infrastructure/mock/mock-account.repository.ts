import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from 'aurora-ts-core';
import { IAccountRepository } from '../../../../../@apps/iam/account/domain/account.repository';
import {
    AccountId,
    AccountType,
    AccountEmail,
    AccountIsActive,
    AccountClientId,
    AccountDApplicationCodes,
    AccountDPermissions,
    AccountDTenants,
    AccountData,
    AccountRoleIds,
    AccountTenantIds,
    AccountCreatedAt,
    AccountUpdatedAt,
    AccountDeletedAt,
} from '../../../../../@apps/iam/account/domain/value-objects';
import { IamAccount } from '../../domain/account.aggregate';
import { accounts } from '../seeds/account.seed';

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
                new AccountEmail(itemCollection.email),
                new AccountIsActive(itemCollection.isActive),
                new AccountClientId(itemCollection.clientId),
                new AccountDApplicationCodes(itemCollection.dApplicationCodes),
                new AccountDPermissions(itemCollection.dPermissions),
                new AccountDTenants(itemCollection.dTenants),
                new AccountData(itemCollection.data),
                new AccountRoleIds(itemCollection.roleIds),
                new AccountTenantIds(itemCollection.tenantIds),
                new AccountCreatedAt(itemCollection.createdAt),
                new AccountUpdatedAt(itemCollection.updatedAt),
                new AccountDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}