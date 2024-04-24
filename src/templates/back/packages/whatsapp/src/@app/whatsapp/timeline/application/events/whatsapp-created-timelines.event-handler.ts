import { WhatsappCreatedTimelinesEvent } from '@app/whatsapp/timeline';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedTimelinesEvent)
export class WhatsappCreatedTimelinesEventHandler implements IEventHandler<WhatsappCreatedTimelinesEvent>
{
    handle(event: WhatsappCreatedTimelinesEvent): void
    {
        // console.log('CreatedTimelinesEvent: ', event);
    }
}
