import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PermissionRoleResponse } from '../../domain/permission-role.response';
import { PermissionRoleMapper } from '../../domain/permission-role.mapper';
import { GetPermissionsRolesQuery } from './get-permissions-roles.query';
import { GetPermissionsRolesService } from './get-permissions-roles.service';

@QueryHandler(GetPermissionsRolesQuery)
export class GetPermissionsRolesQueryHandler implements IQueryHandler<GetPermissionsRolesQuery>
{
    private readonly mapper: PermissionRoleMapper = new PermissionRoleMapper();

    constructor(
        private readonly getPermissionsRolesService: GetPermissionsRolesService,
    ) {}

    async execute(query: GetPermissionsRolesQuery): Promise<PermissionRoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(
            await this.getPermissionsRolesService.main(
                query.queryStatement,
                query.constraint,
                query.cQMetadata,
            ),
        );
    }
}