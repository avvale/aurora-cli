import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { IamPermissionRoleResponse } from '../../domain/iam-permission-role.response';
import { IamPermissionRoleMapper } from '../../domain/iam-permission-role.mapper';
import { IamGetPermissionsRolesQuery } from './iam-get-permissions-roles.query';
import { IamGetPermissionsRolesService } from './iam-get-permissions-roles.service';

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