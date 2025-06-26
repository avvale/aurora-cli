import { ToolsKeyValue } from '@api/graphql';
import { ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsDeleteKeyValueByIdCommand, ToolsFindKeyValueByIdQuery } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteKeyValueByIdHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        id: string,
        constraint?: QueryStatement,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto>
    {
        const keyValue = await this.queryBus.ask(new ToolsFindKeyValueByIdQuery(
            id,
            constraint,
            {
                timezone,
            },
        ));

        await this.commandBus.dispatch(new ToolsDeleteKeyValueByIdCommand(
            id,
            constraint,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return keyValue;
    }
}
