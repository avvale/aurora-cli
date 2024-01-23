import { iamMockTenantData, IamTenant } from '@app/iam/tenant';
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
    IamTenantUpdatedAt,
} from '@app/iam/tenant/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockTenantSeeder extends MockSeeder<IamTenant>
{
    public collectionSource: IamTenant[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const tenant of _.orderBy(iamMockTenantData, ['id']))
        {
            this.collectionSource.push(
                IamTenant.register(
                    new IamTenantId(tenant.id),
                    new IamTenantParentId(tenant.parentId),
                    new IamTenantName(tenant.name),
                    new IamTenantCode(tenant.code),
                    new IamTenantLogo(tenant.logo),
                    new IamTenantIsActive(tenant.isActive),
                    new IamTenantMeta(tenant.meta),
                    new IamTenantAccountIds(tenant.accountIds),
                    new IamTenantCreatedAt({ currentTimestamp: true }),
                    new IamTenantUpdatedAt({ currentTimestamp: true }),
                    new IamTenantDeletedAt(null),
                ),
            );
        }
    }
}
