/* eslint-disable key-spacing */
import { ToolsCreateProcedureCommand } from '@app/tools/procedure';
import { ToolsCreateProcedureService } from '@app/tools/procedure/application/create/tools-create-procedure.service';
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

@CommandHandler(ToolsCreateProcedureCommand)
export class ToolsCreateProcedureCommandHandler
    implements ICommandHandler<ToolsCreateProcedureCommand>
{
    constructor(
        private readonly createProcedureService: ToolsCreateProcedureService,
    ) {}

    async execute(command: ToolsCreateProcedureCommand): Promise<void> {
        // call to use case and implements ValueObjects
        await this.createProcedureService.main(
            {
                id: new ToolsProcedureId(command.payload.id),
                name: new ToolsProcedureName(command.payload.name),
                type: new ToolsProcedureType(command.payload.type),
                version: new ToolsProcedureVersion(command.payload.version),
                isActive: new ToolsProcedureIsActive(command.payload.isActive),
                isExecuted: new ToolsProcedureIsExecuted(
                    command.payload.isExecuted,
                ),
                isUpdated: new ToolsProcedureIsUpdated(
                    command.payload.isUpdated,
                ),
                upScript: new ToolsProcedureUpScript(command.payload.upScript),
                downScript: new ToolsProcedureDownScript(
                    command.payload.downScript,
                ),
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
            command.cQMetadata,
        );
    }
}
