import { IamPermissionRole } from '@api/graphql';
import { IamGetPermissionsRolesQuery } from '@app/iam/permission-role';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';
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
        return await this.queryBus.ask(new IamGetPermissionsRolesQuery(queryStatement, constraint, { timezone }));
    }
}