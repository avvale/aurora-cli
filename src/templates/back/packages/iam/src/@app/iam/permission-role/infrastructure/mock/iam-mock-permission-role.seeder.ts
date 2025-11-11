import {
    iamMockPermissionRoleData,
    IamPermissionRole,
} from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { MockSeeder } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class IamMockPermissionRoleSeeder extends MockSeeder<IamPermissionRole> {
    public collectionSource: IamPermissionRole[];

    constructor() {
        super();
        this._createMock();
    }

    private _createMock(): void {
        this.collectionSource = [];

        for (const permissionRole of _.orderBy(iamMockPermissionRoleData, [
            'id',
        ])) {
            this.collectionSource.push(
                IamPermissionRole.register(
                    new IamPermissionRolePermissionId(
                        permissionRole.permissionId,
                    ),
                    new IamPermissionRoleRoleId(permissionRole.roleId),
                ),
            );
        }
    }
}
