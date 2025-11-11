import { ToolsDeleteKeyValuesCommand } from '@app/tools/key-value';
import { ToolsDeleteKeyValuesService } from '@app/tools/key-value/application/delete/tools-delete-key-values.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteKeyValuesCommand)
export class ToolsDeleteKeyValuesCommandHandler
    implements ICommandHandler<ToolsDeleteKeyValuesCommand>
{
    constructor(
        private readonly deleteKeyValuesService: ToolsDeleteKeyValuesService,
    ) {}

    async execute(command: ToolsDeleteKeyValuesCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.deleteKeyValuesService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
