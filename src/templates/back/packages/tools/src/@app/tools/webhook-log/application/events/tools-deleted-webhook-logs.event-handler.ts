import { ToolsDeletedWebhookLogsEvent } from '@app/tools/webhook-log';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsDeletedWebhookLogsEvent)
export class ToolsDeletedWebhookLogsEventHandler
    implements IEventHandler<ToolsDeletedWebhookLogsEvent>
{
    handle(event: ToolsDeletedWebhookLogsEvent): void {
        // console.log('DeletedWebhookLogsEvent: ', event);
    }
}
