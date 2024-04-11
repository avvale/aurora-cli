import { MessageCreatedInboxSettingEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageCreatedInboxSettingEvent)
export class MessageCreatedInboxSettingEventHandler implements IEventHandler<MessageCreatedInboxSettingEvent>
{
    handle(event: MessageCreatedInboxSettingEvent): void
    {
        // console.log('MessageCreatedInboxSettingEvent: ', event);
    }
}
