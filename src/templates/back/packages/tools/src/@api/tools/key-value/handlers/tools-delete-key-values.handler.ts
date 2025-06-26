import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsDeleteKeyValuesCommand, ToolsGetKeyValuesQuery } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteKeyValuesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue[] | ToolsKeyValueDto[]>
    {
        const keyValues = await this.queryBus.ask(new ToolsGetKeyValuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsDeleteKeyValuesCommand(
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return keyValues;
    }
}
