import { MessageUpdatedInboxSettingEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageUpdatedInboxSettingEvent)
export class MessageUpdatedInboxSettingEventHandler
    implements IEventHandler<MessageUpdatedInboxSettingEvent>
{
    handle(event: MessageUpdatedInboxSettingEvent): void {
        // console.log('UpdatedInboxSettingEvent: ', event);
    }
}
