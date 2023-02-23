import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetPermissionsRolesQuery } from '@app/iam/permission-role/application/get/get-permissions-roles.query';
import { IamPermissionRole } from '@api/graphql';
import { IamPermissionRoleDto } from '../dto';

@Injectable()
export class IamGetPermissionsRolesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermissionRole[] | IamPermissionRoleDto[]>
    {
        return await this.queryBus.ask(new GetPermissionsRolesQuery(queryStatement, constraint, { timezone }));
    }
}