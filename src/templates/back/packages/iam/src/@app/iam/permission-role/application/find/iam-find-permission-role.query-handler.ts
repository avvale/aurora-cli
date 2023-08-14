import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamFindPermissionRoleQuery, IamPermissionRoleMapper, IamPermissionRoleResponse } from '@app/iam/permission-role';
import { IamFindPermissionRoleService } from './iam-find-permission-role.service';

@QueryHandler(IamFindPermissionRoleQuery)
export class IamFindPermissionRoleQueryHandler implements IQueryHandler<IamFindPermissionRoleQuery>
{
    private readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

    constructor(
        private readonly findPermissionService: IamFindPermissionRoleService,
    ) {}

    async execute(query: IamFindPermissionRoleQuery): Promise<IamPermissionRoleResponse>
    {
        const permission = await this.findPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}