import { IamFindPermissionRoleQuery, IamPermissionRoleMapper, IamPermissionRoleResponse } from '@app/iam/permission-role';
import { IamFindPermissionRoleService } from '@app/iam/permission-role/application/find/iam-find-permission-role.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamFindPermissionRoleQuery)
export class IamFindPermissionRoleQueryHandler implements IQueryHandler<IamFindPermissionRoleQuery>
{
    private readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

    constructor(
        private readonly findPermissionRoleService: IamFindPermissionRoleService,
    ) {}

    async execute(query: IamFindPermissionRoleQuery): Promise<IamPermissionRoleResponse>
    {
        const permissionRole = await this.findPermissionRoleService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permissionRole);
    }
}
