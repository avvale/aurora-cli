/* eslint-disable key-spacing */
import { ToolsCreateMigrationCommand } from '@app/tools/migration';
import { ToolsCreateMigrationService } from '@app/tools/migration/application/create/tools-create-migration.service';
import {
    ToolsMigrationDownScript,
    ToolsMigrationExecutedAt,
    ToolsMigrationId,
    ToolsMigrationIsActive,
    ToolsMigrationIsExecuted,
    ToolsMigrationName,
    ToolsMigrationSort,
    ToolsMigrationUpScript,
    ToolsMigrationVersion,
} from '@app/tools/migration/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateMigrationCommand)
export class ToolsCreateMigrationCommandHandler
    implements ICommandHandler<ToolsCreateMigrationCommand>
{
    constructor(
        private readonly createMigrationService: ToolsCreateMigrationService,
    ) {}

    async execute(command: ToolsCreateMigrationCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createMigrationService.main(
            {
                id: new ToolsMigrationId(command.payload.id),
                name: new ToolsMigrationName(command.payload.name),
                version: new ToolsMigrationVersion(command.payload.version),
                isActive: new ToolsMigrationIsActive(command.payload.isActive),
                isExecuted: new ToolsMigrationIsExecuted(
                    command.payload.isExecuted,
                ),
                upScript: new ToolsMigrationUpScript(command.payload.upScript),
                downScript: new ToolsMigrationDownScript(
                    command.payload.downScript,
                ),
                sort: new ToolsMigrationSort(command.payload.sort),
                executedAt: new ToolsMigrationExecutedAt(
                    command.payload.executedAt,
                    {},
                    { applyTimezone: command.cQMetadata?.timezone },
                ),
            },
            command.cQMetadata,
        );
    }
}
