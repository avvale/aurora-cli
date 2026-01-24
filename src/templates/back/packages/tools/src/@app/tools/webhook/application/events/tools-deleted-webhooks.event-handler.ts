import { ToolsDeletedWebhooksEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedWebhooksEvent)
export class ToolsDeletedWebhooksEventHandler
  implements IEventHandler<ToolsDeletedWebhooksEvent>
{
  handle(event: ToolsDeletedWebhooksEvent): void {
    // console.log('DeletedWebhooksEvent: ', event);
  }
}
