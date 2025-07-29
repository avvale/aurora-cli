import { ToolsDeleteMigrationByIdCommand } from '@app/tools/migration';
import { ToolsDeleteMigrationByIdService } from '@app/tools/migration/application/delete/tools-delete-migration-by-id.service';
import { ToolsMigrationId } from '@app/tools/migration/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteMigrationByIdCommand)
export class ToolsDeleteMigrationByIdCommandHandler implements ICommandHandler<ToolsDeleteMigrationByIdCommand>
{
    constructor(
        private readonly deleteMigrationByIdService: ToolsDeleteMigrationByIdService,
    ) {}

    async execute(command: ToolsDeleteMigrationByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteMigrationByIdService.main(
            new ToolsMigrationId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
