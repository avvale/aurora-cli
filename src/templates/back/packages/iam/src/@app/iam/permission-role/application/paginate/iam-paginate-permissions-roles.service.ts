import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
import { IamIPermissionRoleRepository } from '../../domain/iam-permission-role.repository';
import { IamPermissionRole } from '../../domain/iam-permission-role.aggregate';

@Injectable()
export class IamPaginatePermissionsRolesService
{
    constructor(
        private readonly repository: IamIPermissionRoleRepository,
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