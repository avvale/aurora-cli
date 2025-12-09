import { ToolsUpdatedWebhookEvent } from '@app/tools/webhook';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsUpdatedWebhookEvent)
export class ToolsUpdatedWebhookEventHandler
    implements IEventHandler<ToolsUpdatedWebhookEvent>
{
    handle(event: ToolsUpdatedWebhookEvent): void {
        // console.log('UpdatedWebhookEvent: ', event);
    }
}
