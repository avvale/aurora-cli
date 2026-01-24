import { ToolsCreatedWebhookLogEvent } from '@app/tools/webhook-log';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedWebhookLogEvent)
export class ToolsCreatedWebhookLogEventHandler
  implements IEventHandler<ToolsCreatedWebhookLogEvent>
{
  handle(event: ToolsCreatedWebhookLogEvent): void {
    // console.log('ToolsCreatedWebhookLogEvent: ', event);
  }
}
