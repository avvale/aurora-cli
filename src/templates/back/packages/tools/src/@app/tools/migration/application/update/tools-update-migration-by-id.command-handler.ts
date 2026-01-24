/* eslint-disable key-spacing */
import { ToolsUpdateMigrationByIdCommand } from '@app/tools/migration';
import { ToolsUpdateMigrationByIdService } from '@app/tools/migration/application/update/tools-update-migration-by-id.service';
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

@CommandHandler(ToolsUpdateMigrationByIdCommand)
export class ToolsUpdateMigrationByIdCommandHandler
  implements ICommandHandler<ToolsUpdateMigrationByIdCommand>
{
  constructor(
    private readonly updateMigrationByIdService: ToolsUpdateMigrationByIdService,
  ) {}

  async execute(command: ToolsUpdateMigrationByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateMigrationByIdService.main(
      {
        id: new ToolsMigrationId(command.payload.id),
        name: new ToolsMigrationName(command.payload.name, {
          undefinable: true,
        }),
        version: new ToolsMigrationVersion(command.payload.version, {
          undefinable: true,
        }),
        isActive: new ToolsMigrationIsActive(command.payload.isActive, {
          undefinable: true,
        }),
        isExecuted: new ToolsMigrationIsExecuted(command.payload.isExecuted, {
          undefinable: true,
        }),
        upScript: new ToolsMigrationUpScript(command.payload.upScript),
        downScript: new ToolsMigrationDownScript(command.payload.downScript),
        sort: new ToolsMigrationSort(command.payload.sort),
        executedAt: new ToolsMigrationExecutedAt(
          command.payload.executedAt,
          {},
          { applyTimezone: command.cQMetadata?.timezone },
        ),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
