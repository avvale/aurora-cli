import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsFindKeyValueQuery } from '@app/tools/key-value';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsFindKeyValueHandler
{
    constructor(
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto>
    {
        return await this.queryBus.ask(new ToolsFindKeyValueQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
