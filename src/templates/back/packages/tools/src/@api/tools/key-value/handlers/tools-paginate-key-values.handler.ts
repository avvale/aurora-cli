import { Pagination } from '@api/graphql';
import { ToolsPaginateKeyValuesQuery } from '@app/tools/key-value';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateKeyValuesHandler
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
        return await this.queryBus.ask(new ToolsPaginateKeyValuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
