import { WhatsappCreatedConversationEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappCreatedConversationEvent)
export class WhatsappCreatedConversationEventHandler implements IEventHandler<WhatsappCreatedConversationEvent>
{
    handle(event: WhatsappCreatedConversationEvent): void
    {
        // console.log('WhatsappCreatedConversationEvent: ', event);
    }
}
