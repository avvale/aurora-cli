import {
    IamGetPermissionsRolesQuery,
    IamPermissionRole,
    IamPermissionRoleMapper,
    IamPermissionRoleResponse,
} from '@app/iam/permission-role';
import { IamGetPermissionsRolesService } from '@app/iam/permission-role/application/get/iam-get-permissions-roles.service';
import { LiteralObject } from '@aurorajs.dev/core';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(IamGetPermissionsRolesQuery)
export class IamGetPermissionsRolesQueryHandler
    implements IQueryHandler<IamGetPermissionsRolesQuery>
{
    private readonly mapper: IamPermissionRoleMapper =
        new IamPermissionRoleMapper();

    constructor(
        private readonly getPermissionsRolesService: IamGetPermissionsRolesService,
    ) {}

    async execute(
        query: IamGetPermissionsRolesQuery,
    ): Promise<IamPermissionRoleResponse[] | LiteralObject[]> {
        const models = await this.getPermissionsRolesService.main(
            query.queryStatement,
            query.constraint,
            query.cQMetadata,
        );

        if (query.cQMetadata?.excludeMapModelToAggregate) return models;

        return this.mapper.mapAggregatesToResponses(
            models as IamPermissionRole[],
        );
    }
}
