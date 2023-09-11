import { IamAccount, iamMockAccountData } from '@app/iam/account';
import {
    IamAccountClientId,
    IamAccountCode,
    IamAccountCreatedAt,
    IamAccountDApplicationCodes,
    IamAccountDeletedAt,
    IamAccountDPermissions,
    IamAccountDTenants,
    IamAccountEmail,
    IamAccountId,
    IamAccountIsActive,
    IamAccountMeta,
    IamAccountRoleIds,
    IamAccountScopes,
    IamAccountTenantIds,
    IamAccountType,
    IamAccountUpdatedAt,
} from '@app/iam/account/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
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
