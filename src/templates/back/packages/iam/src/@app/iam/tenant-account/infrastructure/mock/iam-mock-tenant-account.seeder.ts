import {
    iamMockTenantAccountData,
    IamTenantAccount,
} from '@app/iam/tenant-account';
import {
    IamTenantAccountAccountId,
    IamTenantAccountTenantId,
} from '@app/iam/tenant-account/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockTenantAccountSeeder extends MockSeeder<IamTenantAccount> {
    public collectionSource: IamTenantAccount[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const tenantAccount of _.orderBy(iamMockTenantAccountData, [
            'id',
        ])) {
            this.collectionSource.push(
                IamTenantAccount.register(
                    new IamTenantAccountTenantId(tenantAccount.tenantId),
                    new IamTenantAccountAccountId(tenantAccount.accountId),
                ),
            );
        }
    }
}
