import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurora-ts/core';
import { CQMetadata } from '@aurora-ts/core';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';

@Injectable()
export class FindPermissionRoleService
{
    constructor(
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<IamPermissionRole>
    {
        return await this.repository.find({ queryStatement, constraint, cQMetadata });
    }
}