import { ToolsDeleteWebhooksCommand } from '@app/tools/webhook';
import { ToolsDeleteWebhooksService } from '@app/tools/webhook/application/delete/tools-delete-webhooks.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteWebhooksCommand)
export class ToolsDeleteWebhooksCommandHandler
  implements ICommandHandler<ToolsDeleteWebhooksCommand>
{
  constructor(
    private readonly deleteWebhooksService: ToolsDeleteWebhooksService,
  ) {}

  async execute(command: ToolsDeleteWebhooksCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteWebhooksService.main(
      command.queryStatement,
      command.constraint,
      command.cQMetadata,
    );
  }
}
