import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginatePermissionsQuery } from '../../../../@apps/iam/permission/application/paginate/paginate-permissions.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class IamPaginatePermissionsHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<Pagination>
    {
        return await this.queryBus.ask(new PaginatePermissionsQuery(queryStatement, constraint, { timezone }));
    }
}