import { CommonCreatedLangsEvent } from '@app/common/lang';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedLangsEvent)
export class CommonCreatedLangsEventHandler
  implements IEventHandler<CommonCreatedLangsEvent>
{
  handle(event: CommonCreatedLangsEvent): void {
    // console.log('CreatedLangsEvent: ', event);
  }
}
