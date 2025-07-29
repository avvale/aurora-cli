/* eslint-disable key-spacing */
import { ToolsUpdateProceduresCommand } from '@app/tools/procedure';
import { ToolsUpdateProceduresService } from '@app/tools/procedure/application/update/tools-update-procedures.service';
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

@CommandHandler(ToolsUpdateProceduresCommand)
export class ToolsUpdateProceduresCommandHandler implements ICommandHandler<ToolsUpdateProceduresCommand>
{
    constructor(
        private readonly updateProceduresService: ToolsUpdateProceduresService,
    ) {}

    async execute(command: ToolsUpdateProceduresCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.updateProceduresService.main(
            {
                id: new ToolsProcedureId(command.payload.id, { undefinable: true }),
                name: new ToolsProcedureName(command.payload.name, { undefinable: true }),
                type: new ToolsProcedureType(command.payload.type, { undefinable: true }),
                version: new ToolsProcedureVersion(command.payload.version, { undefinable: true }),
                isActive: new ToolsProcedureIsActive(command.payload.isActive, { undefinable: true }),
                isExecuted: new ToolsProcedureIsExecuted(command.payload.isExecuted, { undefinable: true }),
                isUpdated: new ToolsProcedureIsUpdated(command.payload.isUpdated, { undefinable: true }),
                upScript: new ToolsProcedureUpScript(command.payload.upScript),
                downScript: new ToolsProcedureDownScript(command.payload.downScript),
                sort: new ToolsProcedureSort(command.payload.sort),
                hash: new ToolsProcedureHash(command.payload.hash),
                executedAt: new ToolsProcedureExecutedAt(command.payload.executedAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
                checkedAt: new ToolsProcedureCheckedAt(command.payload.checkedAt, {}, { removeTimezone: command.cQMetadata?.timezone }),
            },
            command.queryStatement,
            command.constraint,
            command.cQMetadata,
        );
    }
}
