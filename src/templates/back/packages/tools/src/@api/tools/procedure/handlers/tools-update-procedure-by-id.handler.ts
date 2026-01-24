import { ToolsProcedure, ToolsUpdateProcedureByIdInput } from '@api/graphql';
import {
  ToolsProcedureDto,
  ToolsUpdateProcedureByIdDto,
} from '@api/tools/procedure';
import {
  ToolsFindProcedureByIdQuery,
  ToolsUpdateProcedureByIdCommand,
} from '@app/tools/procedure';
import {
  diff,
  ICommandBus,
  IQueryBus,
  QueryStatement,
} from '@aurorajs.dev/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ToolsUpdateProcedureByIdHandler {
  constructor(
    private readonly commandBus: ICommandBus,
    private readonly queryBus: IQueryBus,
  ) {}

  async main(
    payload: ToolsUpdateProcedureByIdInput | ToolsUpdateProcedureByIdDto,
    constraint?: QueryStatement,
    timezone?: string,
  ): Promise<ToolsProcedure | ToolsProcedureDto> {
    const procedure = await this.queryBus.ask(
      new ToolsFindProcedureByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );

    const dataToUpdate = diff(payload, procedure);

    if ('upScript' in dataToUpdate) {
      dataToUpdate.isUpdated = true;
    }

    await this.commandBus.dispatch(
      new ToolsUpdateProcedureByIdCommand(
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
      new ToolsFindProcedureByIdQuery(payload.id, constraint, {
        timezone,
      }),
    );
  }
}
