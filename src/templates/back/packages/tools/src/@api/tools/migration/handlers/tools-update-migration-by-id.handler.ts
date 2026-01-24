import { ToolsMigration, ToolsUpdateMigrationByIdInput } from '@api/graphql';
import {
  ToolsMigrationDto,
  ToolsUpdateMigrationByIdDto,
} from '@api/tools/migration';
import {
  ToolsFindMigrationByIdQuery,
  ToolsUpdateMigrationByIdCommand,
} from '@app/tools/migration';
import {
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateMigrationByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsUpdateMigrationByIdInput | ToolsUpdateMigrationByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsMigration | ToolsMigrationDto> {
    const migration = await this.queryBus.ask(
      new ToolsFindMigrationByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, migration);

    await this.commandBus.dispatch(
      new ToolsUpdateMigrationByIdCommand(
        {
          ...dataToUpdate,
          id: payload.id,
        },
        constraint,
        {
          timezone,
        },
      ),
    );

    return await this.queryBus.ask(
      new ToolsFindMigrationByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
