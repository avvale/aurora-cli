/* eslint-disable key-spacing */
import { ToolsUpdateKeyValuesCommand } from '@app/tools/key-value';
import { ToolsUpdateKeyValuesService } from '@app/tools/key-value/application/update/tools-update-key-values.service';
import {
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueKey,
    ToolsKeyValueType,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsUpdateKeyValuesCommand)
export class ToolsUpdateKeyValuesCommandHandler implements ICommandHandler<ToolsUpdateKeyValuesCommand>
{
    constructor(
        private readonly updateKeyValuesService: ToolsUpdateKeyValuesService,
    ) {}

    async execute(command: ToolsUpdateKeyValuesCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateKeyValuesService.main(
            {
                id: new ToolsKeyValueId(command.payload.id, { undefinable: true }),
                key: new ToolsKeyValueKey(command.payload.key, { undefinable: true }),
                type: new ToolsKeyValueType(command.payload.type, { undefinable: true }),
                value: new ToolsKeyValueValue(command.payload.value, { undefinable: true }),
                isActive: new ToolsKeyValueIsActive(command.payload.isActive, { undefinable: true }),
                description: new ToolsKeyValueDescription(command.payload.description),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
