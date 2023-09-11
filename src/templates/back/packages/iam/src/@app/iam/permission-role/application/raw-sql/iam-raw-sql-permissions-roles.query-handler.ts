import { IamPermissionRoleMapper, IamPermissionRoleResponse, IamRawSQLPermissionsRolesQuery } from '@app/iam/permission-role';
import { IamRawSQLPermissionsRolesService } from '@app/iam/permission-role/application/raw-sql/iam-raw-sql-permissions-roles.service';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamRawSQLPermissionsRolesQuery)
export class IamRawSQLPermissionsRolesQueryHandler implements IQueryHandler<IamRawSQLPermissionsRolesQuery>
{
    private readonly mapper: IamPermissionRoleMapper = new IamPermissionRoleMapper();

    constructor(
        private readonly rawSQLPermissionsRolesService: IamRawSQLPermissionsRolesService,
    ) {}

    async execute(query: IamRawSQLPermissionsRolesQuery): Promise<IamPermissionRoleResponse[]>
    {
        return this.mapper.mapAggregatesToResponses(await this.rawSQLPermissionsRolesService.main(
            query.rawSQL,
            query.cQMetadata,
        ));
    }
}
