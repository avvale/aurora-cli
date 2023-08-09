import { Pagination } from '@api/graphql';
import { CommonPaginateResourcesQuery } from '@app/common/resource';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonPaginateResourcesHandler
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
        return await this.queryBus.ask(new CommonPaginateResourcesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
