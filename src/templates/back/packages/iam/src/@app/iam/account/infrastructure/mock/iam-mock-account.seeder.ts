import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    IamAccountId,
    IamAccountType,
    IamAccountCode,
    IamAccountEmail,
    IamAccountIsActive,
    IamAccountClientId,
    IamAccountScopes,
    IamAccountDApplicationCodes,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountTenantIds,
    IamAccountCreatedAt,
    IamAccountUpdatedAt,
    IamAccountDeletedAt,
} from '../../domain/value-objects';
import { IamAccount } from '../../domain/iam-account.aggregate';
import { iamMockAccountData } from './iam-mock-account.data';
import * as _ from 'lodash';

@Injectable()
export class IamMockAccountSeeder extends MockSeeder<IamAccount>
{
    public collectionSource: IamAccount[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const account of _.orderBy(iamMockAccountData, ['id']))
        {
            this.collectionSource.push(
                IamAccount.register(
                    new IamAccountId(account.id),
                    new IamAccountType(account.type),
                    new IamAccountCode(account.code),
                    new IamAccountEmail(account.email),
                    new IamAccountIsActive(account.isActive),
                    new IamAccountClientId(account.clientId),
                    new IamAccountScopes(account.scopes),
                    new IamAccountDApplicationCodes(account.dApplicationCodes),
                    new IamAccountDPermissions(account.dPermissions),
                    new IamAccountDTenants(account.dTenants),
                    new IamAccountMeta(account.meta),
                    new IamAccountRoleIds(account.roleIds),
                    new IamAccountTenantIds(account.tenantIds),
                    new IamAccountCreatedAt({ currentTimestamp: true }),
                    new IamAccountUpdatedAt({ currentTimestamp: true }),
                    new IamAccountDeletedAt(null),
                ),
            );
        }
    }
}
