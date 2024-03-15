import { WhatsappCreatedMessagesEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedMessagesEvent)
export class WhatsappCreatedMessagesEventHandler implements IEventHandler<WhatsappCreatedMessagesEvent>
{
    handle(event: WhatsappCreatedMessagesEvent): void
    {
        // console.log('CreatedMessagesEvent: ', event);
    }
}
