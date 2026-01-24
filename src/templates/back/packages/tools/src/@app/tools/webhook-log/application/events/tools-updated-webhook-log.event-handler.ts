import { ToolsUpdatedWebhookLogEvent } from '@app/tools/webhook-log';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedWebhookLogEvent)
export class ToolsUpdatedWebhookLogEventHandler
  implements IEventHandler<ToolsUpdatedWebhookLogEvent>
{
  handle(event: ToolsUpdatedWebhookLogEvent): void {
    // console.log('UpdatedWebhookLogEvent: ', event);
  }
}
