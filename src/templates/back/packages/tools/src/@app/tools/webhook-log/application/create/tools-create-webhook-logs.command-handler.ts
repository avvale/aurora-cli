/* eslint-disable key-spacing */
import { ToolsCreateWebhookLogsCommand } from '@app/tools/webhook-log';
import { ToolsCreateWebhookLogsService } from '@app/tools/webhook-log/application/create/tools-create-webhook-logs.service';
import {
  ToolsWebhookLogBodyRequest,
  ToolsWebhookLogHeaderRequest,
  ToolsWebhookLogId,
  ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateWebhookLogsCommand)
export class ToolsCreateWebhookLogsCommandHandler
  implements ICommandHandler<ToolsCreateWebhookLogsCommand>
{
  constructor(
    private readonly createWebhookLogsService: ToolsCreateWebhookLogsService,
  ) {}

  async execute(command: ToolsCreateWebhookLogsCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createWebhookLogsService.main(
      command.payload.map((webhookLog) => {
        return {
          id: new ToolsWebhookLogId(webhookLog.id),
          url: new ToolsWebhookLogUrl(webhookLog.url),
          headerRequest: new ToolsWebhookLogHeaderRequest(
            webhookLog.headerRequest,
          ),
          bodyRequest: new ToolsWebhookLogBodyRequest(webhookLog.bodyRequest),
        };
      }),
      command.cQMetadata,
    );
  }
}
