import { WhatsappDeletedTimelineEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedTimelineEvent)
export class WhatsappDeletedTimelineEventHandler implements IEventHandler<WhatsappDeletedTimelineEvent>
{
    handle(event: WhatsappDeletedTimelineEvent): void
    {
        // console.log('WhatsappDeletedTimelineEvent: ', event);
    }
}
