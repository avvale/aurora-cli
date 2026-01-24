import { ToolsDigestedWebhookEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDigestedWebhookEvent)
export class ToolsDigestedWebhookEventHandler
  implements IEventHandler<ToolsDigestedWebhookEvent>
{
  handle(event: ToolsDigestedWebhookEvent): void {
    // console.log('ToolsDigestedWebhookEvent: ', event.event.payload.payload);
  }
}
