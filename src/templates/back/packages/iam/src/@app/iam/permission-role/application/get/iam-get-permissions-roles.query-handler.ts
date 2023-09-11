import { IamGetPermissionsRolesQuery, IamPermissionRoleMapper, IamPermissionRoleResponse } from '@app/iam/permission-role';
import { IamGetPermissionsRolesService } from '@app/iam/permission-role/application/get/iam-get-permissions-roles.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetPermissionsRolesQuery)
export class IamGetPermissionsRolesQueryHandler implements IQueryHandler<IamGetPermissionsRolesQuery>
{
    private readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

    constructor(
        private readonly getPermissionsRolesService: IamGetPermissionsRolesService,
    ) {}

    async execute(query: IamGetPermissionsRolesQuery): Promise<IamPermissionRoleResponse[]>
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
