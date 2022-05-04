import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateTenantsQuery } from '../../../../@apps/iam/tenant/application/paginate/paginate-tenants.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class IamPaginateTenantsHandler
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
        return await this.queryBus.ask(new PaginateTenantsQuery(queryStatement, constraint, { timezone }));
    }
}