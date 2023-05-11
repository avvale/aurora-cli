import { Injectable } from '@nestjs/common';
import { QueryStatement } from '@aurorajs.dev/core';
import { Pagination } from '@aurorajs.dev/core';
import { CQMetadata } from '@aurorajs.dev/core';
import { IPermissionRoleRepository } from '../../domain/permission-role.repository';
import { IamPermissionRole } from '../../domain/permission-role.aggregate';

@Injectable()
export class PaginatePermissionsRolesService
{
    constructor(
        private readonly repository: IPermissionRoleRepository,
    ) {}

    async main(queryStatement?: QueryStatement, constraint?: QueryStatement, cQMetadata?: CQMetadata): Promise<Pagination<IamPermissionRole>>
    {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}