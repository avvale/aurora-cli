import { Injectable } from '@nestjs/common';
import { MockSeeder } from '@aurorajs.dev/core';
import {
    IamRoleId,
    IamRoleName,
    IamRoleIsMaster,
    IamRolePermissionIds,
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleUpdatedAt,
    IamRoleDeletedAt,
} from '../../domain/value-objects';
import { IamRole } from '../../domain/iam-role.aggregate';
import { iamMockRoleData } from './iam-mock-role.data';
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
