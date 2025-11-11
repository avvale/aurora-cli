import { ToolsCreateKeyValueInput } from '@api/graphql';
import { ToolsCreateKeyValueDto } from '@api/tools/key-value';
import { ToolsCreateKeyValuesCommand } from '@app/tools/key-value';
import { AuditingMeta, ICommandBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateKeyValuesHandler {
    constructor(private readonly commandBus: ICommandBus) {}

    async main(
        payload: ToolsCreateKeyValueInput[] | ToolsCreateKeyValueDto[],
        timezone?: string,
        auditing?: AuditingMeta,
    ): Promise<boolean> {
        await this.commandBus.dispatch(
            new ToolsCreateKeyValuesCommand(payload, {
                timezone,
                repositoryOptions: {
                    auditing,
                },
            }),
        );

        return true;
    }
}
