import { ToolsProcedure } from '@api/graphql';
import { ToolsProcedureDto } from '@api/tools/procedure';
import {
  ToolsDeleteProcedureByIdCommand,
  ToolsFindProcedureByIdQuery,
} from '@app/tools/procedure';
import { ICommandBus, IQueryBus, QueryStatement } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsDeleteProcedureByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    id: string,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsProcedure | ToolsProcedureDto> {
    const procedure = await this.queryBus.ask(
      new ToolsFindProcedureByIdQuery(id, constraint, {
        timezone,
      }),
    );

    await this.commandBus.dispatch(
      new ToolsDeleteProcedureByIdCommand(id, constraint, {
        timezone,
      }),
    );

    return procedure;
  }
}
