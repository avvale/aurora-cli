import { CommonCreatedResourceEvent } from '@app/common/resource';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedResourceEvent)
export class CommonCreatedResourceEventHandler
  implements IEventHandler<CommonCreatedResourceEvent>
{
  handle(event: CommonCreatedResourceEvent): void {
    // console.log('CommonCreatedResourceEvent: ', event);
  }
}
