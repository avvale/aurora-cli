/* eslint-disable key-spacing */
import { ToolsUpdateMigrationsCommand } from '@app/tools/migration';
import { ToolsUpdateMigrationsService } from '@app/tools/migration/application/update/tools-update-migrations.service';
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

@CommandHandler(ToolsUpdateMigrationsCommand)
export class ToolsUpdateMigrationsCommandHandler
    implements ICommandHandler<ToolsUpdateMigrationsCommand>
{
    constructor(
        private readonly updateMigrationsService: ToolsUpdateMigrationsService,
    ) {}

    async execute(command: ToolsUpdateMigrationsCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.updateMigrationsService.main(
            {
                id: new ToolsMigrationId(command.payload.id, {
                    undefinable: true,
                }),
                name: new ToolsMigrationName(command.payload.name, {
                    undefinable: true,
                }),
                version: new ToolsMigrationVersion(command.payload.version, {
                    undefinable: true,
                }),
                isActive: new ToolsMigrationIsActive(command.payload.isActive, {
                    undefinable: true,
                }),
                isExecuted: new ToolsMigrationIsExecuted(
                    command.payload.isExecuted,
                    { undefinable: true },
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
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
