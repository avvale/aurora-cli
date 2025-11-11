import {
    IamITenantRepository,
    iamMockTenantData,
    IamTenant,
} from '@app/iam/tenant';
import {
    IamTenantAccountIds,
    IamTenantCode,
    IamTenantCreatedAt,
    IamTenantDeletedAt,
    IamTenantId,
    IamTenantIsActive,
    IamTenantLogo,
    IamTenantMeta,
    IamTenantName,
    IamTenantParentId,
    IamTenantRowId,
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockTenantRepository
    extends MockRepository<IamTenant>
    implements IamITenantRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamTenant';
    public collectionSource: IamTenant[];

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

        for (const itemCollection of <any[]>iamMockTenantData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                IamTenant.register(
                    new IamTenantId(itemCollection.id),
                    new IamTenantRowId(itemCollection.rowId),
                    new IamTenantParentId(itemCollection.parentId),
                    new IamTenantName(itemCollection.name),
                    new IamTenantCode(itemCollection.code),
                    new IamTenantLogo(itemCollection.logo),
                    new IamTenantIsActive(itemCollection.isActive),
                    new IamTenantMeta(itemCollection.meta),
                    new IamTenantAccountIds(itemCollection.accountIds),
                    new IamTenantCreatedAt(itemCollection.createdAt),
                    new IamTenantUpdatedAt(itemCollection.updatedAt),
                    new IamTenantDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
