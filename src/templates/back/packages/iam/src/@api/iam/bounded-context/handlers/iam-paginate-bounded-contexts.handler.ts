import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurora-ts/core';

// @app
import { PaginateBoundedContextsQuery } from '@app/iam/bounded-context/application/paginate/paginate-bounded-contexts.query';
import { Pagination } from '@api/graphql';

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
        return await this.queryBus.ask(new PaginateBoundedContextsQuery(
            queryStatement,
            constraint,
            { timezone },
        ));
    }
}