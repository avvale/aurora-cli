import { WhatsappUpdatedAndIncrementedMessagesEvent } from '@app/whatsapp/message';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedAndIncrementedMessagesEvent)
export class WhatsappUpdatedAndIncrementedMessagesEventHandler implements IEventHandler<WhatsappUpdatedAndIncrementedMessagesEvent>
{
    handle(event: WhatsappUpdatedAndIncrementedMessagesEvent): void
    {
        // console.log('WhatsappUpdatedAndIncrementedMessagesEvent: ', event);
    }
}
