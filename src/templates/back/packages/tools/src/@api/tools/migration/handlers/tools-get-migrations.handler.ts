import { ToolsMigration } from '@api/graphql';
import { ToolsMigrationDto } from '@api/tools/migration';
import { ToolsGetMigrationsQuery } from '@app/tools/migration';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetMigrationsHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsMigration[] | ToolsMigrationDto[]> {
    return await this.queryBus.ask(
      new ToolsGetMigrationsQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
