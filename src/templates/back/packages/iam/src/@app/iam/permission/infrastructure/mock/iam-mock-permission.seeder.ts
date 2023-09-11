import { iamMockPermissionData, IamPermission } from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionCreatedAt,
    IamPermissionDeletedAt,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockPermissionSeeder extends MockSeeder<IamPermission>
{
    public collectionSource: IamPermission[];

    constructor()
    {
        super();
        this._createMock();
    }

    private _createMock(): void
    {
        this.collectionSource = [];

        for (const permission of _.orderBy(iamMockPermissionData, ['id']))
        {
            this.collectionSource.push(
                IamPermission.register(
                    new IamPermissionId(permission.id),
                    new IamPermissionName(permission.name),
                    new IamPermissionBoundedContextId(permission.boundedContextId),
                    new IamPermissionRoleIds(permission.roleIds),
                    new IamPermissionCreatedAt({ currentTimestamp: true }),
                    new IamPermissionUpdatedAt({ currentTimestamp: true }),
                    new IamPermissionDeletedAt(null),
                ),
            );
        }
    }
}
