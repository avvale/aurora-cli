/* eslint-disable key-spacing */
import { ToolsCreateKeyValuesCommand } from '@app/tools/key-value';
import { ToolsCreateKeyValuesService } from '@app/tools/key-value/application/create/tools-create-key-values.service';
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

@CommandHandler(ToolsCreateKeyValuesCommand)
export class ToolsCreateKeyValuesCommandHandler
  implements ICommandHandler<ToolsCreateKeyValuesCommand>
{
  constructor(
    private readonly createKeyValuesService: ToolsCreateKeyValuesService,
  ) {}

  async execute(command: ToolsCreateKeyValuesCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createKeyValuesService.main(
      command.payload.map((keyValue) => {
        return {
          id: new ToolsKeyValueId(keyValue.id),
          key: new ToolsKeyValueKey(keyValue.key),
          type: new ToolsKeyValueType(keyValue.type),
          value: new ToolsKeyValueValue(keyValue.value),
          isCached: new ToolsKeyValueIsCached(keyValue.isCached),
          isActive: new ToolsKeyValueIsActive(keyValue.isActive),
          description: new ToolsKeyValueDescription(keyValue.description),
        };
      }),
      command.cQMetadata,
    );
  }
}
