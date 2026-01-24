import { ToolsCreateMigrationInput, ToolsMigration } from '@api/graphql';
import {
  ToolsCreateMigrationDto,
  ToolsMigrationDto,
} from '@api/tools/migration';
import {
  ToolsCreateMigrationCommand,
  ToolsFindMigrationByIdQuery,
} from '@app/tools/migration';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateMigrationHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsCreateMigrationInput | ToolsCreateMigrationDto,
    timezone?: string,
  ): Promise<ToolsMigration | ToolsMigrationDto> {
    await this.commandBus.dispatch(
      new ToolsCreateMigrationCommand(
        {
          ...payload,
          isExecuted: false,
        },
        {
          timezone,
        },
      ),
    );

    return await this.queryBus.ask(
      new ToolsFindMigrationByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
