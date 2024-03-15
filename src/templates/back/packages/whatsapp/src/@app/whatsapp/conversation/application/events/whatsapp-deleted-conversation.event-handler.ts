import { WhatsappDeletedConversationEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedConversationEvent)
export class WhatsappDeletedConversationEventHandler implements IEventHandler<WhatsappDeletedConversationEvent>
{
    handle(event: WhatsappDeletedConversationEvent): void
    {
        // console.log('WhatsappDeletedConversationEvent: ', event);
    }
}
