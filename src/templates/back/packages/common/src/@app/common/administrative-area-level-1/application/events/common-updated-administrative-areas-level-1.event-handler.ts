import { CommonUpdatedAdministrativeAreasLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel1Event)
export class CommonUpdatedAdministrativeAreasLevel1EventHandler
  implements IEventHandler<CommonUpdatedAdministrativeAreasLevel1Event>
{
  handle(event: CommonUpdatedAdministrativeAreasLevel1Event): void {
    // console.log('CommonUpdatedAdministrativeAreasLevel1Event: ', event);
  }
}
