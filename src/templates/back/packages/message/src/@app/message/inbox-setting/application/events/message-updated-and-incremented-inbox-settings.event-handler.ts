import { MessageUpdatedAndIncrementedInboxSettingsEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedAndIncrementedInboxSettingsEvent)
export class MessageUpdatedAndIncrementedInboxSettingsEventHandler implements IEventHandler<MessageUpdatedAndIncrementedInboxSettingsEvent>
{
    handle(event: MessageUpdatedAndIncrementedInboxSettingsEvent): void
    {
        // console.log('MessageUpdatedAndIncrementedInboxSettingsEvent: ', event);
    }
}
