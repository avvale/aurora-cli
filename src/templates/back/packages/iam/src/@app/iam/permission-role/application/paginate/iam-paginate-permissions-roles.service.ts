import {
    IamIPermissionRoleRepository,
    IamPermissionRole,
} from '@app/iam/permission-role';
import { CQMetadata, Pagination, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class IamPaginatePermissionsRolesService {
    constructor(private readonly repository: IamIPermissionRoleRepository) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        cQMetadata?: CQMetadata,
    ): Promise<Pagination<IamPermissionRole>> {
        return await this.repository.paginate({
            queryStatement,
            constraint,
            cQMetadata,
        });
    }
}
