import { MessageDeletedInboxSettingsEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedInboxSettingsEvent)
export class MessageDeletedInboxSettingsEventHandler
    implements IEventHandler<MessageDeletedInboxSettingsEvent>
{
    handle(event: MessageDeletedInboxSettingsEvent): void {
        // console.log('DeletedInboxSettingsEvent: ', event);
    }
}
