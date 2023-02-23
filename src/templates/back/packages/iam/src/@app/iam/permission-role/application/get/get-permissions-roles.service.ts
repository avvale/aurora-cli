import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';

@Injectable()
export class GetPermissionsRolesService
{
    constructor(
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermissionRole[]>
    {
        return await this.repository.get({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}