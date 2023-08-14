import { Injectable } from '@nestjs/common';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { IamIRoleRepository } from '@app/iam/role/domain/iam-role.repository';
import {
    IamRoleId,
    IamRoleName,
    IamRoleIsMaster,
    IamRolePermissionIds,
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleUpdatedAt,
    IamRoleDeletedAt,
} from '@app/iam/role/domain/value-objects';
import { IamRole } from '../../domain/iam-role.aggregate';
import { iamMockRoleData } from './iam-mock-role.data';

@Injectable()
export class IamMockRoleRepository extends MockRepository<IamRole> implements IamIRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamRole';
    public collectionSource: IamRole[];
    public deletedAtInstance: IamRoleDeletedAt = new IamRoleDeletedAt(null);

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

        for (const itemCollection of <any[]>iamMockRoleData)
        {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(IamRole.register(
                new IamRoleId(itemCollection.id),
                new IamRoleName(itemCollection.name),
                new IamRoleIsMaster(itemCollection.isMaster),
                new IamRolePermissionIds(itemCollection.permissionIds),
                new IamRoleAccountIds(itemCollection.accountIds),
                new IamRoleCreatedAt(itemCollection.createdAt),
                new IamRoleUpdatedAt(itemCollection.updatedAt),
                new IamRoleDeletedAt(itemCollection.deletedAt),
            ));
        }
    }
}
