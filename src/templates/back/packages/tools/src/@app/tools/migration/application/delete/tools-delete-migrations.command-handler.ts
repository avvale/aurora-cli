import { ToolsDeleteMigrationsCommand } from '@app/tools/migration';
import { ToolsDeleteMigrationsService } from '@app/tools/migration/application/delete/tools-delete-migrations.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteMigrationsCommand)
export class ToolsDeleteMigrationsCommandHandler implements ICommandHandler<ToolsDeleteMigrationsCommand>
{
    constructor(
        private readonly deleteMigrationsService: ToolsDeleteMigrationsService,
    ) {}

    async execute(command: ToolsDeleteMigrationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMigrationsService.main(
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
