import { MessageCreatedInboxSettingsEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedInboxSettingsEvent)
export class MessageCreatedInboxSettingsEventHandler implements IEventHandler<MessageCreatedInboxSettingsEvent>
{
    handle(event: MessageCreatedInboxSettingsEvent): void
    {
        // console.log('CreatedInboxSettingsEvent: ', event);
    }
}
