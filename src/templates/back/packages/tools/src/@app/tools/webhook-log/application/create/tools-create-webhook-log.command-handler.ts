/* eslint-disable key-spacing */
import { ToolsCreateWebhookLogCommand } from '@app/tools/webhook-log';
import { ToolsCreateWebhookLogService } from '@app/tools/webhook-log/application/create/tools-create-webhook-log.service';
import {
  ToolsWebhookLogBodyRequest,
  ToolsWebhookLogHeaderRequest,
  ToolsWebhookLogId,
  ToolsWebhookLogUrl,
} from '@app/tools/webhook-log/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(ToolsCreateWebhookLogCommand)
export class ToolsCreateWebhookLogCommandHandler
  implements ICommandHandler<ToolsCreateWebhookLogCommand>
{
  constructor(
    private readonly createWebhookLogService: ToolsCreateWebhookLogService,
  ) {}

  async execute(command: ToolsCreateWebhookLogCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.createWebhookLogService.main(
      {
        id: new ToolsWebhookLogId(command.payload.id),
        url: new ToolsWebhookLogUrl(command.payload.url),
        headerRequest: new ToolsWebhookLogHeaderRequest(
          command.payload.headerRequest,
        ),
        bodyRequest: new ToolsWebhookLogBodyRequest(
          command.payload.bodyRequest,
        ),
      },
      command.cQMetadata,
    );
  }
}
