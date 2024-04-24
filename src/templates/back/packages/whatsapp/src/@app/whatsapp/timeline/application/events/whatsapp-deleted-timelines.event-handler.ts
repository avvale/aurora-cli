import { WhatsappDeletedTimelinesEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedTimelinesEvent)
export class WhatsappDeletedTimelinesEventHandler implements IEventHandler<WhatsappDeletedTimelinesEvent>
{
    handle(event: WhatsappDeletedTimelinesEvent): void
    {
        // console.log('DeletedTimelinesEvent: ', event);
    }
}
