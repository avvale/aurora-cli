import { WhatsappDeletedMessagesEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedMessagesEvent)
export class WhatsappDeletedMessagesEventHandler implements IEventHandler<WhatsappDeletedMessagesEvent>
{
    handle(event: WhatsappDeletedMessagesEvent): void
    {
        // console.log('DeletedMessagesEvent: ', event);
    }
}
