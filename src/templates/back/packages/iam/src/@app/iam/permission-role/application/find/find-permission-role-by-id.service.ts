import { Injectable } from '@nestjs/common';
import { CQMetadata, QueryStatement } from '@aurora-ts/core';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';
import {
    PermissionRolePermissionId,
    PermissionRoleRoleId,
} from '../../domain/value-objects';

@Injectable()
export class FindPermissionRoleByIdService
{
    constructor(
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        permissionId: PermissionRolePermissionId,
        roleId: PermissionRoleRoleId,
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