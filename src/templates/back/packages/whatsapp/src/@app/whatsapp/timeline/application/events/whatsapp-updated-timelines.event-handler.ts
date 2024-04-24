import { WhatsappUpdatedTimelinesEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedTimelinesEvent)
export class WhatsappUpdatedTimelinesEventHandler implements IEventHandler<WhatsappUpdatedTimelinesEvent>
{
    handle(event: WhatsappUpdatedTimelinesEvent): void
    {
        // console.log('WhatsappUpdatedTimelinesEvent: ', event);
    }
}
