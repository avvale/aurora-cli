import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamIAccountRepository } from '@app/iam/account/domain/iam-account.repository';
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
} from '@app/iam/account/domain/value-objects';
import { IamAccount } from '../../domain/iam-account.aggregate';
import { iamMockAccountData } from './iam-mock-account.data';

@Injectable()
export class IamMockAccountRepository extends MockRepository<IamAccount> implements IamIAccountRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamAccount';
    public collectionSource: IamAccount[];
    public deletedAtInstance: IamAccountDeletedAt = new IamAccountDeletedAt(null);

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

        for (const itemCollection of <any[]>iamMockAccountData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamAccount.register(
                new IamAccountId(itemCollection.id),
                new IamAccountType(itemCollection.type),
                new IamAccountCode(itemCollection.code),
                new IamAccountEmail(itemCollection.email),
                new IamAccountIsActive(itemCollection.isActive),
                new IamAccountClientId(itemCollection.clientId),
                new IamAccountScopes(itemCollection.scopes),
                new IamAccountDApplicationCodes(itemCollection.dApplicationCodes),
                new IamAccountDPermissions(itemCollection.dPermissions),
                new IamAccountDTenants(itemCollection.dTenants),
                new IamAccountMeta(itemCollection.meta),
                new IamAccountRoleIds(itemCollection.roleIds),
                new IamAccountTenantIds(itemCollection.tenantIds),
                new IamAccountCreatedAt(itemCollection.createdAt),
                new IamAccountUpdatedAt(itemCollection.updatedAt),
                new IamAccountDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
