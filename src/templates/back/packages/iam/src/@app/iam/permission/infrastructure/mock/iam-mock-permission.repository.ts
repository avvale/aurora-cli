import { IamIPermissionRepository, iamMockPermissionData, IamPermission } from '@app/iam/permission';
import {
    IamPermissionBoundedContextId,
    IamPermissionCreatedAt,
    IamPermissionDeletedAt,
    IamPermissionId,
    IamPermissionName,
    IamPermissionRoleIds,
    IamPermissionUpdatedAt,
} from '@app/iam/permission/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockPermissionRepository extends MockRepository<IamPermission> implements IamIPermissionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamPermission';
    public collectionSource: IamPermission[];

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

        for (const itemCollection of <any[]>iamMockPermissionData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamPermission.register(
                new IamPermissionId(itemCollection.id),
                new IamPermissionName(itemCollection.name),
                new IamPermissionBoundedContextId(itemCollection.boundedContextId),
                new IamPermissionRoleIds(itemCollection.roleIds),
                new IamPermissionCreatedAt(itemCollection.createdAt),
                new IamPermissionUpdatedAt(itemCollection.updatedAt),
                new IamPermissionDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
