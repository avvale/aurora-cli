import { WhatsappUpdatedConversationEvent } from '@app/whatsapp/conversation';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(WhatsappUpdatedConversationEvent)
export class WhatsappUpdatedConversationEventHandler implements IEventHandler<WhatsappUpdatedConversationEvent>
{
    handle(event: WhatsappUpdatedConversationEvent): void
    {
        // console.log('UpdatedConversationEvent: ', event);
    }
}
