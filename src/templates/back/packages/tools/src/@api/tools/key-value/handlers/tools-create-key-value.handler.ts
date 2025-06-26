import { ToolsCreateKeyValueInput, ToolsKeyValue } from '@api/graphql';
import { ToolsCreateKeyValueDto, ToolsKeyValueDto } from '@api/tools/key-value';
import { ToolsCreateKeyValueCommand, ToolsFindKeyValueByIdQuery } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateKeyValueHandler
{
    constructor(
        private readonly commandBus: ICommandBus,
        private readonly queryBus: IQueryBus,
    ) {}

    async main(
        payload: ToolsCreateKeyValueInput | ToolsCreateKeyValueDto,
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<ToolsKeyValue | ToolsKeyValueDto>
    {
        await this.commandBus.dispatch(new ToolsCreateKeyValueCommand(
            payload,
            {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            },
        ));

        return await this.queryBus.ask(new ToolsFindKeyValueByIdQuery(
            payload.id,
            {},
            {
                timezone,
            },
        ));
    }
}
