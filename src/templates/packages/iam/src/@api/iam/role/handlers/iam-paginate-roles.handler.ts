import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateRolesQuery } from '../../../../@apps/iam/role/application/paginate/paginate-roles.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class IamPaginateRolesHandler
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
        return await this.queryBus.ask(new PaginateRolesQuery(queryStatement, constraint, { timezone }));
    }
}