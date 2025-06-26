import { ToolsDeleteKeyValueByIdCommand } from '@app/tools/key-value';
import { ToolsDeleteKeyValueByIdService } from '@app/tools/key-value/application/delete/tools-delete-key-value-by-id.service';
import { ToolsKeyValueId } from '@app/tools/key-value/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteKeyValueByIdCommand)
export class ToolsDeleteKeyValueByIdCommandHandler implements ICommandHandler<ToolsDeleteKeyValueByIdCommand>
{
    constructor(
        private readonly deleteKeyValueByIdService: ToolsDeleteKeyValueByIdService,
    ) {}

    async execute(command: ToolsDeleteKeyValueByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteKeyValueByIdService.main(
            new ToolsKeyValueId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
