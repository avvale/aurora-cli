import { iamMockRoleAccountData, IamRoleAccount } from '@app/iam/role-account';
import {
    IamRoleAccountAccountId,
    IamRoleAccountRoleId,
} from '@app/iam/role-account/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockRoleAccountSeeder extends MockSeeder<IamRoleAccount> {
    public collectionSource: IamRoleAccount[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const roleAccount of _.orderBy(iamMockRoleAccountData, ['id'])) {
            this.collectionSource.push(
                IamRoleAccount.register(
                    new IamRoleAccountRoleId(roleAccount.roleId),
                    new IamRoleAccountAccountId(roleAccount.accountId),
                ),
            );
        }
    }
}
