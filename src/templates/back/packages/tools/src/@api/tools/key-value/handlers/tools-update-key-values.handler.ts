import { ToolsKeyValue, ToolsUpdateKeyValuesInput } from '@api/graphql';
import { ToolsKeyValueDto, ToolsUpdateKeyValuesDto } from '@api/tools/key-value';
import { ToolsGetKeyValuesQuery, ToolsUpdateKeyValuesCommand } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateKeyValuesHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsUpdateKeyValuesInput | ToolsUpdateKeyValuesDto,
        queryStatement?: QueryStatement,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto>
    {
        await this.commandBus.dispatch(new ToolsUpdateKeyValuesCommand(
            payload,
            queryStatement,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new ToolsGetKeyValuesQuery(
            queryStatement,
            constraint,
            {
                timezone,
            },
        ));
    }
}
