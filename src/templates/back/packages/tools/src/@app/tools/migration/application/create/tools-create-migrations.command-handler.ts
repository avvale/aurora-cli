/* eslint-disable key-spacing */
import { ToolsCreateMigrationsCommand } from '@app/tools/migration';
import { ToolsCreateMigrationsService } from '@app/tools/migration/application/create/tools-create-migrations.service';
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

@CommandHandler(ToolsCreateMigrationsCommand)
export class ToolsCreateMigrationsCommandHandler implements ICommandHandler<ToolsCreateMigrationsCommand>
{
    constructor(
        private readonly createMigrationsService: ToolsCreateMigrationsService,
    ) {}

    async execute(command: ToolsCreateMigrationsCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createMigrationsService.main(
            command.payload
                .map(migration =>
                {
                    return {
                        id: new ToolsMigrationId(migration.id),
                        name: new ToolsMigrationName(migration.name),
                        version: new ToolsMigrationVersion(migration.version),
                        isActive: new ToolsMigrationIsActive(migration.isActive),
                        isExecuted: new ToolsMigrationIsExecuted(migration.isExecuted),
                        upScript: new ToolsMigrationUpScript(migration.upScript),
                        downScript: new ToolsMigrationDownScript(migration.downScript),
                        sort: new ToolsMigrationSort(migration.sort),
                        executedAt: new ToolsMigrationExecutedAt(migration.executedAt, {}, { applyTimezone: command.cQMetadata?.timezone }),
                    };
                }),
            command.cQMetadata,
        );
    }
}
