/* eslint-disable key-spacing */
import { ToolsCreateProcedureCommand } from '@app/tools/procedure';
import { ToolsCreateProcedureService } from '@app/tools/procedure/application/create/tools-create-procedure.service';
import {
    ToolsProcedureCheckedAt,
    ToolsProcedureDownScript,
    ToolsProcedureExecutedAt,
    ToolsProcedureId,
    ToolsProcedureIsActive,
    ToolsProcedureIsInstalled,
    ToolsProcedureIsUpdated,
    ToolsProcedureName,
    ToolsProcedureSort,
    ToolsProcedureType,
    ToolsProcedureUpScript,
    ToolsProcedureVersion,
} from '@app/tools/procedure/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateProcedureCommand)
export class ToolsCreateProcedureCommandHandler implements ICommandHandler<ToolsCreateProcedureCommand>
{
    constructor(
        private readonly createProcedureService: ToolsCreateProcedureService,
    ) {}

    async execute(command: ToolsCreateProcedureCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.createProcedureService.main(
            {
                id: new ToolsProcedureId(command.payload.id),
                name: new ToolsProcedureName(command.payload.name),
                type: new ToolsProcedureType(command.payload.type),
                version: new ToolsProcedureVersion(command.payload.version),
                isActive: new ToolsProcedureIsActive(command.payload.isActive),
                isInstalled: new ToolsProcedureIsInstalled(command.payload.isInstalled),
                isUpdated: new ToolsProcedureIsUpdated(command.payload.isUpdated),
                upScript: new ToolsProcedureUpScript(command.payload.upScript),
                downScript: new ToolsProcedureDownScript(command.payload.downScript),
                sort: new ToolsProcedureSort(command.payload.sort),
                executedAt: new ToolsProcedureExecutedAt(command.payload.executedAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
                checkedAt: new ToolsProcedureCheckedAt(command.payload.checkedAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
            },
            command.cQMetadata,
        );
    }
}
