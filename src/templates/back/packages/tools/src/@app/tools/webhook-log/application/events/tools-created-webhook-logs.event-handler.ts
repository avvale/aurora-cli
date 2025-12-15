import { ToolsCreatedWebhookLogsEvent } from '@app/tools/webhook-log';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(ToolsCreatedWebhookLogsEvent)
export class ToolsCreatedWebhookLogsEventHandler
    implements IEventHandler<ToolsCreatedWebhookLogsEvent>
{
    handle(event: ToolsCreatedWebhookLogsEvent): void {
        // console.log('CreatedWebhookLogsEvent: ', event);
    }
}
