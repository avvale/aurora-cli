import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from 'aurora-ts-core';
import { ITenantRepository } from '../../../../../@apps/iam/tenant/domain/tenant.repository';
import {
    TenantId,
    TenantName,
    TenantCode,
    TenantLogo,
    TenantIsActive,
    TenantData,
    TenantAccountIds,
    TenantCreatedAt,
    TenantUpdatedAt,
    TenantDeletedAt,
} from '../../../../../@apps/iam/tenant/domain/value-objects';
import { IamTenant } from '../../domain/tenant.aggregate';
import { tenants } from '../seeds/tenant.seed';

@Injectable()
export class MockTenantRepository extends MockRepository<IamTenant> implements ITenantRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamTenant';
    public collectionSource: IamTenant[];
    public deletedAtInstance: TenantDeletedAt = new TenantDeletedAt(null);

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

        for (const itemCollection of <any[]>tenants)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamTenant.register(
                new TenantId(itemCollection.id),
                new TenantName(itemCollection.name),
                new TenantCode(itemCollection.code),
                new TenantLogo(itemCollection.logo),
                new TenantIsActive(itemCollection.isActive),
                new TenantData(itemCollection.data),
                new TenantAccountIds(itemCollection.accountIds),
                new TenantCreatedAt(itemCollection.createdAt),
                new TenantUpdatedAt(itemCollection.updatedAt),
                new TenantDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}