import { IamIRoleAccountRepository, iamMockRoleAccountData, IamRoleAccount } from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockRoleAccountRepository extends MockRepository<IamRoleAccount> implements IamIRoleAccountRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamRoleAccount';
    public collectionSource: IamRoleAccount[];

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

        for (const itemCollection of <any[]>iamMockRoleAccountData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamRoleAccount.register(
                new IamRoleAccountRoleId(itemCollection.roleId),
                new IamRoleAccountAccountId(itemCollection.accountId),
            ));
        }
    }
}
