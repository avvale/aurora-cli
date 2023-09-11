import { IamIPermissionRoleRepository, iamMockPermissionRoleData, IamPermissionRole } from '@app/iam/permission-role';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '@app/iam/permission-role/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockPermissionRoleRepository extends MockRepository<IamPermissionRole> implements IamIPermissionRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamPermissionRole';
    public collectionSource: IamPermissionRole[];

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

        for (const itemCollection of <any[]>iamMockPermissionRoleData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamPermissionRole.register(
                new IamPermissionRolePermissionId(itemCollection.permissionId),
                new IamPermissionRoleRoleId(itemCollection.roleId),
            ));
        }
    }
}
