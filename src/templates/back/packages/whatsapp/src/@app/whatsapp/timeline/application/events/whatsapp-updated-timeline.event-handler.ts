import { WhatsappUpdatedTimelineEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedTimelineEvent)
export class WhatsappUpdatedTimelineEventHandler implements IEventHandler<WhatsappUpdatedTimelineEvent>
{
    handle(event: WhatsappUpdatedTimelineEvent): void
    {
        // console.log('UpdatedTimelineEvent: ', event);
    }
}
