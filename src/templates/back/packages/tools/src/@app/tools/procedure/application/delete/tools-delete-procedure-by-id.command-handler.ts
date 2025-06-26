import { ToolsDeleteProcedureByIdCommand } from '@app/tools/procedure';
import { ToolsDeleteProcedureByIdService } from '@app/tools/procedure/application/delete/tools-delete-procedure-by-id.service';
import { ToolsProcedureId } from '@app/tools/procedure/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteProcedureByIdCommand)
export class ToolsDeleteProcedureByIdCommandHandler implements ICommandHandler<ToolsDeleteProcedureByIdCommand>
{
    constructor(
        private readonly deleteProcedureByIdService: ToolsDeleteProcedureByIdService,
    ) {}

    async execute(command: ToolsDeleteProcedureByIdCommand): Promise<void>
    {
        // call to use case and implements ValueObjects
        await this.deleteProcedureByIdService.main(
            new ToolsProcedureId(command.id),
            command.constraint,
            command.cQMetadata,
        );
    }
}
