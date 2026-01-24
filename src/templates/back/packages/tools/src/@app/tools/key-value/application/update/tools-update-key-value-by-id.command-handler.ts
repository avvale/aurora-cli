/* eslint-disable key-spacing */
import { ToolsUpdateKeyValueByIdCommand } from '@app/tools/key-value';
import { ToolsUpdateKeyValueByIdService } from '@app/tools/key-value/application/update/tools-update-key-value-by-id.service';
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

@CommandHandler(ToolsUpdateKeyValueByIdCommand)
export class ToolsUpdateKeyValueByIdCommandHandler
  implements ICommandHandler<ToolsUpdateKeyValueByIdCommand>
{
  constructor(
    private readonly updateKeyValueByIdService: ToolsUpdateKeyValueByIdService,
  ) {}

  async execute(command: ToolsUpdateKeyValueByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateKeyValueByIdService.main(
      {
        id: new ToolsKeyValueId(command.payload.id),
        key: new ToolsKeyValueKey(command.payload.key, {
          undefinable: true,
        }),
        type: new ToolsKeyValueType(command.payload.type, {
          undefinable: true,
        }),
        value: new ToolsKeyValueValue(command.payload.value),
        isCached: new ToolsKeyValueIsCached(command.payload.isCached, {
          undefinable: true,
        }),
        isActive: new ToolsKeyValueIsActive(command.payload.isActive, {
          undefinable: true,
        }),
        description: new ToolsKeyValueDescription(command.payload.description),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
