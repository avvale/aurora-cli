import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsGetKeyValuesQuery } from '@app/tools/key-value';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetKeyValuesHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsKeyValue[] | ToolsKeyValueDto[]>
    {
        return await this.queryBus.ask(new ToolsGetKeyValuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
