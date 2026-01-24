import { ToolsDeleteProceduresCommand } from '@app/tools/procedure';
import { ToolsDeleteProceduresService } from '@app/tools/procedure/application/delete/tools-delete-procedures.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteProceduresCommand)
export class ToolsDeleteProceduresCommandHandler
  implements ICommandHandler<ToolsDeleteProceduresCommand>
{
  constructor(
    private readonly deleteProceduresService: ToolsDeleteProceduresService,
  ) {}

  async execute(command: ToolsDeleteProceduresCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteProceduresService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
