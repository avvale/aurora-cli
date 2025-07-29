import { Pagination } from '@api/graphql';
import { ToolsPaginateMigrationsQuery } from '@app/tools/migration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsPaginateMigrationsHandler
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
        return await this.queryBus.ask(new ToolsPaginateMigrationsQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
