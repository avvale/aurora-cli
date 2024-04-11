import { MessageUpdatedAndIncrementedInboxesEvent } from '@app/message/inbox';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedAndIncrementedInboxesEvent)
export class MessageUpdatedAndIncrementedInboxesEventHandler implements IEventHandler<MessageUpdatedAndIncrementedInboxesEvent>
{
    handle(event: MessageUpdatedAndIncrementedInboxesEvent): void
    {
        // console.log('MessageUpdatedAndIncrementedInboxesEvent: ', event);
    }
}
