import { MessageUpdatedInboxSettingsEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedInboxSettingsEvent)
export class MessageUpdatedInboxSettingsEventHandler
    implements IEventHandler<MessageUpdatedInboxSettingsEvent>
{
    handle(event: MessageUpdatedInboxSettingsEvent): void {
        // console.log('MessageUpdatedInboxSettingsEvent: ', event);
    }
}
