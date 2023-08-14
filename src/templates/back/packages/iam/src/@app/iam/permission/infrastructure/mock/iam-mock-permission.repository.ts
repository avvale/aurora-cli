import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamIPermissionRepository } from '@app/iam/permission/domain/iam-permission.repository';
import {
    IamPermissionId,
    IamPermissionName,
    IamPermissionBoundedContextId,
    IamPermissionRoleIds,
    IamPermissionCreatedAt,
    IamPermissionUpdatedAt,
    IamPermissionDeletedAt,
} from '@app/iam/permission/domain/value-objects';
import { IamPermission } from '../../domain/iam-permission.aggregate';
import { iamMockPermissionData } from './iam-mock-permission.data';

@Injectable()
export class IamMockPermissionRepository extends MockRepository<IamPermission> implements IamIPermissionRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamPermission';
    public collectionSource: IamPermission[];
    public deletedAtInstance: IamPermissionDeletedAt = new IamPermissionDeletedAt(null);

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
