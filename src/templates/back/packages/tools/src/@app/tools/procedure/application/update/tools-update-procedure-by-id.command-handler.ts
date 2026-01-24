/* eslint-disable key-spacing */
import { ToolsUpdateProcedureByIdCommand } from '@app/tools/procedure';
import { ToolsUpdateProcedureByIdService } from '@app/tools/procedure/application/update/tools-update-procedure-by-id.service';
import {
  ToolsProcedureCheckedAt,
  ToolsProcedureDownScript,
  ToolsProcedureExecutedAt,
  ToolsProcedureHash,
  ToolsProcedureId,
  ToolsProcedureIsActive,
  ToolsProcedureIsExecuted,
  ToolsProcedureIsUpdated,
  ToolsProcedureName,
  ToolsProcedureSort,
  ToolsProcedureType,
  ToolsProcedureUpScript,
  ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsUpdateProcedureByIdCommand)
export class ToolsUpdateProcedureByIdCommandHandler
  implements ICommandHandler<ToolsUpdateProcedureByIdCommand>
{
  constructor(
    private readonly updateProcedureByIdService: ToolsUpdateProcedureByIdService,
  ) {}

  async execute(command: ToolsUpdateProcedureByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.updateProcedureByIdService.main(
      {
        id: new ToolsProcedureId(command.payload.id),
        name: new ToolsProcedureName(command.payload.name, {
          undefinable: true,
        }),
        type: new ToolsProcedureType(command.payload.type, {
          undefinable: true,
        }),
        version: new ToolsProcedureVersion(command.payload.version, {
          undefinable: true,
        }),
        isActive: new ToolsProcedureIsActive(command.payload.isActive, {
          undefinable: true,
        }),
        isExecuted: new ToolsProcedureIsExecuted(command.payload.isExecuted, {
          undefinable: true,
        }),
        isUpdated: new ToolsProcedureIsUpdated(command.payload.isUpdated, {
          undefinable: true,
        }),
        upScript: new ToolsProcedureUpScript(command.payload.upScript),
        downScript: new ToolsProcedureDownScript(command.payload.downScript),
        sort: new ToolsProcedureSort(command.payload.sort),
        hash: new ToolsProcedureHash(command.payload.hash),
        executedAt: new ToolsProcedureExecutedAt(
          command.payload.executedAt,
          {},
          { applyTimezone: command.cQMetadata?.timezone },
        ),
        checkedAt: new ToolsProcedureCheckedAt(
          command.payload.checkedAt,
          {},
          { applyTimezone: command.cQMetadata?.timezone },
        ),
      },
      command.constraint,
      command.cQMetadata,
    );
  }
}
