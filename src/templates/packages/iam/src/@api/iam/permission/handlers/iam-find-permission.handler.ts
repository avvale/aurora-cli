import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { FindPermissionQuery } from '../../../../@apps/iam/permission/application/find/find-permission.query';
import { IamPermission } from '../../../../graphql';
import { IamPermissionDto } from '../dto';

@Injectable()
export class IamFindPermissionHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<IamPermission | IamPermissionDto>
    {
        return await this.queryBus.ask(new FindPermissionQuery(queryStatement, constraint, { timezone }));
    }
}