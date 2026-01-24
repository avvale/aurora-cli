import { ToolsCreateProcedureInput, ToolsProcedure } from '@api/graphql';
import {
  ToolsCreateProcedureDto,
  ToolsProcedureDto,
} from '@api/tools/procedure';
import {
  ToolsCreateProcedureCommand,
  ToolsFindProcedureByIdQuery,
} from '@app/tools/procedure';
import { ICommandBus, IQueryBus } from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsCreateProcedureHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsCreateProcedureInput | ToolsCreateProcedureDto,
    timezone?: string,
  ): Promise<ToolsProcedure | ToolsProcedureDto> {
    await this.commandBus.dispatch(
      new ToolsCreateProcedureCommand(
        {
          ...payload,
          isExecuted: false,
          isUpdated: false,
        },
        {
          timezone,
        },
      ),
    );

    return await this.queryBus.ask(
      new ToolsFindProcedureByIdQuery(
        payload.id,
        {},
        {
          timezone,
        },
      ),
    );
  }
}
