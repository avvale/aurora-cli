import { CommonDeletedAdministrativeAreaLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreaLevel1Event)
export class CommonDeletedAdministrativeAreaLevel1EventHandler
  implements IEventHandler<CommonDeletedAdministrativeAreaLevel1Event>
{
  handle(event: CommonDeletedAdministrativeAreaLevel1Event): void {
    // console.log('CommonDeletedAdministrativeAreaLevel1Event: ', event);
  }
}
