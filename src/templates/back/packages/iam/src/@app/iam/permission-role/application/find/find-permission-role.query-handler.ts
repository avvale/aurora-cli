import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRoleResponse } from '../../domain/permission-role.response';
import { PermissionRoleMapper } from '../../domain/permission-role.mapper';
import { FindPermissionRoleQuery } from './find-permission-role.query';
import { FindPermissionRoleService } from './find-permission-role.service';

@QueryHandler(FindPermissionRoleQuery)
export class FindPermissionRoleQueryHandler implements IQueryHandler<FindPermissionRoleQuery>
{
    private readonly mapper: PermissionRoleMapper = new PermissionRoleMapper();

    constructor(
        private readonly findPermissionService: FindPermissionRoleService,
    ) {}

    async execute(query: FindPermissionRoleQuery): Promise<PermissionRoleResponse>
    {
        const permission = await this.findPermissionService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        return this.mapper.mapAggregateToResponse(permission);
    }
}