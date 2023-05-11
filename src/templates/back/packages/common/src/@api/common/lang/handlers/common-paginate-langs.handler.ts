import { Injectable } from '@nestjs/common';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';

// @app
import { PaginateLangsQuery } from '@app/common/lang/application/paginate/paginate-langs.query';
import { Pagination } from '@api/graphql';

@Injectable()
export class CommonPaginateLangsHandler
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
        return await this.queryBus.ask(new PaginateLangsQuery(queryStatement, constraint, { timezone }));
    }
}