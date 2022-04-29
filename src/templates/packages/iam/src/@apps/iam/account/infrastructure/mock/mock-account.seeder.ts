import { Injectable } from '@nestjs/common';
import { MockSeeder } from 'aurora-ts-core';
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
} from '../../domain/value-objects';
import { IamAccount } from '../../domain/account.aggregate';
import { accounts } from '../seeds/account.seed';
import * as _ from 'lodash';

@Injectable()
export class MockAccountSeeder extends MockSeeder<IamAccount>
{
    public collectionSource: IamAccount[];

    constructor()
    {
        super();
        this._createMockDataLang();
    }

    private _createMockDataLang(): void
    {
        this.collectionSource = [];

        for (const account of _.orderBy(accounts, ['id']))
        {
            this.collectionSource.push(
                IamAccount.register(
                    new AccountId(account.id),
                    new AccountType(account.type),
                    new AccountEmail(account.email),
                    new AccountIsActive(account.isActive),
                    new AccountClientId(account.clientId),
                    new AccountDApplicationCodes(account.dApplicationCodes),
                    new AccountDPermissions(account.dPermissions),
                    new AccountDTenants(account.dTenants),
                    new AccountData(account.data),
                    new AccountRoleIds(account.roleIds),
                    new AccountTenantIds(account.tenantIds),
                    new AccountCreatedAt({ currentTimestamp: true }),
                    new AccountUpdatedAt({ currentTimestamp: true }),
                    new AccountDeletedAt(null),
                ),
            );
        }
    }
}