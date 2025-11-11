import {
    IamITenantAccountRepository,
    iamMockTenantAccountData,
    IamTenantAccount,
} from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockTenantAccountRepository
    extends MockRepository<IamTenantAccount>
    implements IamITenantAccountRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamTenantAccount';
    public collectionSource: IamTenantAccount[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>iamMockTenantAccountData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                IamTenantAccount.register(
                    new IamTenantAccountTenantId(itemCollection.tenantId),
                    new IamTenantAccountAccountId(itemCollection.accountId),
                ),
            );
        }
    }
}
