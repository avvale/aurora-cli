import { ToolsDeleteWebhookLogByIdCommand } from '@app/tools/webhook-log';
import { ToolsDeleteWebhookLogByIdService } from '@app/tools/webhook-log/application/delete/tools-delete-webhook-log-by-id.service';
import { ToolsWebhookLogId } from '@app/tools/webhook-log/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsDeleteWebhookLogByIdCommand)
export class ToolsDeleteWebhookLogByIdCommandHandler
  implements ICommandHandler<ToolsDeleteWebhookLogByIdCommand>
{
  constructor(
    private readonly deleteWebhookLogByIdService: ToolsDeleteWebhookLogByIdService,
  ) {}

  async execute(command: ToolsDeleteWebhookLogByIdCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.deleteWebhookLogByIdService.main(
      new ToolsWebhookLogId(command.id),
      command.constraint,
      command.cQMetadata,
    );
  }
}
