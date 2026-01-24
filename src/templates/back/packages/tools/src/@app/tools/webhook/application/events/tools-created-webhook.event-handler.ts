import { ToolsCreatedWebhookEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedWebhookEvent)
export class ToolsCreatedWebhookEventHandler
  implements IEventHandler<ToolsCreatedWebhookEvent>
{
  handle(event: ToolsCreatedWebhookEvent): void {
    // console.log('ToolsCreatedWebhookEvent: ', event);
  }
}
