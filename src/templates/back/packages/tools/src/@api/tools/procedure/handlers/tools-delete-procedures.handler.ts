import { ToolsProcedure } from '@api/graphql';
import { ToolsProcedureDto } from '@api/tools/procedure';
import {
  ToolsDeleteProceduresCommand,
  ToolsGetProceduresQuery,
} from '@app/tools/procedure';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteProceduresHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    queryStatement?: QueryStatement,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsProcedure[] | ToolsProcedureDto[]> {
    const procedures = await this.queryBus.ask(
      new ToolsGetProceduresQuery(queryStatement, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new ToolsDeleteProceduresCommand(queryStatement, constraint, {
        timezone,
      }),
    );

    return procedures;
  }
}
