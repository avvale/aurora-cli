import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { GetPermissionsQuery } from '@app/iam/permission/application/get/get-permissions.query';
import { IamPermission } from '@api/graphql';
import { IamPermissionDto } from '../dto';

@Injectable()
export class IamGetPermissionsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission[] | IamPermissionDto[]>
    {
        return await this.queryBus.ask(new GetPermissionsQuery(queryStatement, constraint, { timezone }));
    }
}