import { IamIRoleRepository, iamMockRoleData, IamRole } from '@app/iam/role';
import {
    IamRoleAccountIds,
    IamRoleCreatedAt,
    IamRoleDefaultRedirection,
    IamRoleDeletedAt,
    IamRoleHasHiddenVerticalNavigation,
    IamRoleId,
    IamRoleIsMaster,
    IamRoleName,
    IamRolePermissionIds,
    IamRoleRowId,
    IamRoleUpdatedAt,
} from '@app/iam/role/domain/value-objects';
import { MockRepository, Utils } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamMockRoleRepository
    extends MockRepository<IamRole>
    implements IamIRoleRepository
{
    public readonly repository: any;
    public readonly aggregateName: string = 'IamRole';
    public collectionSource: IamRole[];

    constructor() {
        super();
        this.createSourceMockData();
    }

    public reset(): void {
        this.createSourceMockData();
    }

    private createSourceMockData(): void {
        this.collectionSource = [];
        const now = Utils.nowTimestamp();

        for (const itemCollection of <any[]>iamMockRoleData) {
            itemCollection['createdAt'] = now;
            itemCollection['updatedAt'] = now;
            itemCollection['deletedAt'] = null;

            this.collectionSource.push(
                IamRole.register(
                    new IamRoleId(itemCollection.id),
                    new IamRoleRowId(itemCollection.rowId),
                    new IamRoleName(itemCollection.name),
                    new IamRoleDefaultRedirection(
                        itemCollection.defaultRedirection,
                    ),
                    new IamRoleHasHiddenVerticalNavigation(
                        itemCollection.hasHiddenVerticalNavigation,
                    ),
                    new IamRoleIsMaster(itemCollection.isMaster),
                    new IamRolePermissionIds(itemCollection.permissionIds),
                    new IamRoleAccountIds(itemCollection.accountIds),
                    new IamRoleCreatedAt(itemCollection.createdAt),
                    new IamRoleUpdatedAt(itemCollection.updatedAt),
                    new IamRoleDeletedAt(itemCollection.deletedAt),
                ),
            );
        }
    }
}
