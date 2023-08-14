import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamITenantRepository } from '@app/iam/tenant/domain/iam-tenant.repository';
import {
    IamTenantId,
    IamTenantName,
    IamTenantCode,
    IamTenantLogo,
    IamTenantIsActive,
    IamTenantMeta,
    IamTenantAccountIds,
    IamTenantCreatedAt,
    IamTenantUpdatedAt,
    IamTenantDeletedAt,
} from '@app/iam/tenant/domain/value-objects';
import { IamTenant } from '../../domain/iam-tenant.aggregate';
import { iamMockTenantData } from './iam-mock-tenant.data';

@Injectable()
export class IamMockTenantRepository extends MockRepository<IamTenant> implements IamITenantRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamTenant';
    public collectionSource: IamTenant[];
    public deletedAtInstance: IamTenantDeletedAt = new IamTenantDeletedAt(null);

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

        for (const itemCollection of <any[]>iamMockTenantData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamTenant.register(
                new IamTenantId(itemCollection.id),
                new IamTenantName(itemCollection.name),
                new IamTenantCode(itemCollection.code),
                new IamTenantLogo(itemCollection.logo),
                new IamTenantIsActive(itemCollection.isActive),
                new IamTenantMeta(itemCollection.meta),
                new IamTenantAccountIds(itemCollection.accountIds),
                new IamTenantCreatedAt(itemCollection.createdAt),
                new IamTenantUpdatedAt(itemCollection.updatedAt),
                new IamTenantDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
