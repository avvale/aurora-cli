import { ToolsProcedure } from '@api/graphql';
import { ToolsProcedureDto } from '@api/tools/procedure';
import { ToolsGetProceduresQuery } from '@app/tools/procedure';
import { IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsGetProceduresHandler {
  constructor(private readonly queryBus: IQueryBus) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsProcedure[] | ToolsProcedureDto[]> {
    return await this.queryBus.ask(
      new ToolsGetProceduresQuery(queryStatement, constraint, {
        timezone,
      }),
    );
  }
}
