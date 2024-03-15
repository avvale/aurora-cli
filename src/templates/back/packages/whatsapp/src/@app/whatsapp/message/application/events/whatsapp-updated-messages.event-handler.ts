import { WhatsappUpdatedMessagesEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedMessagesEvent)
export class WhatsappUpdatedMessagesEventHandler implements IEventHandler<WhatsappUpdatedMessagesEvent>
{
    handle(event: WhatsappUpdatedMessagesEvent): void
    {
        // console.log('WhatsappUpdatedMessagesEvent: ', event);
    }
}
