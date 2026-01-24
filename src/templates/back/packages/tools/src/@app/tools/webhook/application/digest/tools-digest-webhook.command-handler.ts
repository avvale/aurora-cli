/* eslint-disable key-spacing */
import { ToolsDigestWebhookCommand } from '@app/tools/webhook';
import {
  ToolsWebhookHeaders,
  ToolsWebhookPayload,
} from '@app/tools/webhook/domain/value-objects';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ToolsDigestWebhookService } from './tools-digest-webhook.service';

@CommandHandler(ToolsDigestWebhookCommand)
export class ToolsDigestWebhookCommandHandler
  implements ICommandHandler<ToolsDigestWebhookCommand>
{
  constructor(
    private readonly digestWebhookService: ToolsDigestWebhookService,
  ) {}

  async execute(command: ToolsDigestWebhookCommand): Promise<void> {
    // call to use case and implements ValueObjects
    await this.digestWebhookService.main(
      new ToolsWebhookHeaders(command.headers),
      new ToolsWebhookPayload(command.payload),
    );
  }
}
