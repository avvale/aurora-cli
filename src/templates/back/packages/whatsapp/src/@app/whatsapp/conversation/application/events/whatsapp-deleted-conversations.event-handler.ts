import { WhatsappDeletedConversationsEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappDeletedConversationsEvent)
export class WhatsappDeletedConversationsEventHandler implements IEventHandler<WhatsappDeletedConversationsEvent>
{
    handle(event: WhatsappDeletedConversationsEvent): void
    {
        // console.log('DeletedConversationsEvent: ', event);
    }
}
