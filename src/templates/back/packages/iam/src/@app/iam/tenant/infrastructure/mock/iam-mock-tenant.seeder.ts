import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
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
} from '../../domain/value-objects';
import { IamTenant } from '../../domain/iam-tenant.aggregate';
import { iamMockTenantData } from './iam-mock-tenant.data';
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
