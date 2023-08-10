import { IamIPermissionRoleRepository, IamPermissionRole } from '@app/iam/permission-role';
import { CQMetadata, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import {
    IamPermissionRolePermissionId,
    IamPermissionRoleRoleId,
} from '../../domain/value-objects';

@Injectable()
export class IamFindPermissionRoleByIdService
{
    constructor(
        private readonly repository: IamIPermissionRoleRepository,
    ) {}

    async main(
        permissionId: IamPermissionRolePermissionId,
        roleId: IamPermissionRoleRoleId,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermissionRole>
    {
        return await this.repository.find({
            queryStatement: {
                where: {
                    permissionId: permissionId.value,
                    roleId      : roleId.value,
                },
            },
            constraint,
            cQMetadata,
        });
    }
}