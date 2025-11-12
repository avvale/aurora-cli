/* eslint-disable key-spacing */
import { ToolsCreateKeyValueCommand } from '@app/tools/key-value';
import { ToolsCreateKeyValueService } from '@app/tools/key-value/application/create/tools-create-key-value.service';
import {
    ToolsKeyValueDescription,
    ToolsKeyValueId,
    ToolsKeyValueIsActive,
    ToolsKeyValueIsCached,
    ToolsKeyValueKey,
    ToolsKeyValueType,
    ToolsKeyValueValue,
} from '@app/tools/key-value/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateKeyValueCommand)
export class ToolsCreateKeyValueCommandHandler
    implements ICommandHandler<ToolsCreateKeyValueCommand>
{
    constructor(
        private readonly createKeyValueService: ToolsCreateKeyValueService,
    ) {}

    async execute(command: ToolsCreateKeyValueCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createKeyValueService.main(
            {
                id: new ToolsKeyValueId(command.payload.id),
                key: new ToolsKeyValueKey(command.payload.key),
                type: new ToolsKeyValueType(command.payload.type),
                value: new ToolsKeyValueValue(command.payload.value),
                isCached: new ToolsKeyValueIsCached(command.payload.isCached),
                isActive: new ToolsKeyValueIsActive(command.payload.isActive),
                description: new ToolsKeyValueDescription(
                    command.payload.description,
                ),
            },
            command.cQMetadata,
        );
    }
}
