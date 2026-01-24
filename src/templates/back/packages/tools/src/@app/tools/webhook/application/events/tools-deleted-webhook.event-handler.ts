import { ToolsDeletedWebhookEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedWebhookEvent)
export class ToolsDeletedWebhookEventHandler
  implements IEventHandler<ToolsDeletedWebhookEvent>
{
  handle(event: ToolsDeletedWebhookEvent): void {
    // console.log('ToolsDeletedWebhookEvent: ', event);
  }
}
