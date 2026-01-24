import { ToolsCreatedWebhooksEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedWebhooksEvent)
export class ToolsCreatedWebhooksEventHandler
  implements IEventHandler<ToolsCreatedWebhooksEvent>
{
  handle(event: ToolsCreatedWebhooksEvent): void {
    // console.log('CreatedWebhooksEvent: ', event);
  }
}
