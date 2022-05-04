import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from 'aurora-ts-core';

// @apps
import { PaginateBoundedContextsQuery } from '../../../../@apps/iam/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { Pagination } from '../../../../graphql';

@Injectable()
export class IamPaginateBoundedContextsHandler
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
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(queryStatement, constraint, { timezone }));
    }
}