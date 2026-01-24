import { ToolsDeletedWebhookLogEvent } from '@app/tools/webhook-log';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedWebhookLogEvent)
export class ToolsDeletedWebhookLogEventHandler
  implements IEventHandler<ToolsDeletedWebhookLogEvent>
{
  handle(event: ToolsDeletedWebhookLogEvent): void {
    // console.log('ToolsDeletedWebhookLogEvent: ', event);
  }
}
