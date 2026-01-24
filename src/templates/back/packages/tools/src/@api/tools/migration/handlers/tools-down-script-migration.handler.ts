import { ToolsRawSQLInformationSchemaCommand } from '@app/tools/information-schema';
import {
  ToolsFindMigrationByIdQuery,
  ToolsUpdateMigrationByIdCommand,
} from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDownScriptMigrationHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(migrationId: string, timezone?: string): Promise<boolean> {
    const migration = await this.queryBus.ask(
      new ToolsFindMigrationByIdQuery(
        migrationId,
        {},
        {
          timezone,
        },
      ),
    );

    await this.commandBus.dispatch(
      new ToolsRawSQLInformationSchemaCommand(
        {
          rawSQL: migration.downScript,
        },
        {
          timezone,
        },
      ),
    );

    await this.commandBus.dispatch(
      new ToolsUpdateMigrationByIdCommand(
        {
          id: migration.id,
          isExecuted: false,
          executedAt: null,
        },
        {},
        {
          timezone,
        },
      ),
    );

    return true;
  }
}
