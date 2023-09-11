import { iamMockRoleData, IamRole } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDeletedAt,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockRoleSeeder extends MockSeeder<IamRole>
{
    public collectionSource: IamRole[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const role of _.orderBy(iamMockRoleData, ['id']))
        {
            this.collectionSource.push(
                IamRole.register(
                    new IamRoleId(role.id),
                    new IamRoleName(role.name),
                    new IamRoleIsMaster(role.isMaster),
                    // ---- customizations ----
                    new IamRolePermissionIds(role.permissions.map(permission => permission.id)),
                    // add permissions on administrator account
                    new IamRoleAccountIds(['948a5308-a49d-42dc-9ea3-7490e120000b']),
                    new IamRoleCreatedAt({ currentTimestamp: true }),
                    new IamRoleUpdatedAt({ currentTimestamp: true }),
                    new IamRoleDeletedAt(null),
                ),
            );
        }
    }
}
