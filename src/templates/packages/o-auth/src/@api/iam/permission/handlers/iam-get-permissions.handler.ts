import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { GetPermissionsQuery } from '../../../../@apps/iam/permission/application/get/get-permissions.query';
import { IamPermission } from '../../../../graphql';
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