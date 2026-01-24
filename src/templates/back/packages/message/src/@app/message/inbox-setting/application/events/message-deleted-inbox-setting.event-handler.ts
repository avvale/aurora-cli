import { MessageDeletedInboxSettingEvent } from '@app/message/inbox-setting';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MessageDeletedInboxSettingEvent)
export class MessageDeletedInboxSettingEventHandler
  implements IEventHandler<MessageDeletedInboxSettingEvent>
{
  handle(event: MessageDeletedInboxSettingEvent): void {
    // console.log('MessageDeletedInboxSettingEvent: ', event);
  }
}
