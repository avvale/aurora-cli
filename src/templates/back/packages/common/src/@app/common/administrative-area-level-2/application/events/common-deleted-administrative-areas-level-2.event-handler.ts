import { CommonDeletedAdministrativeAreasLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreasLevel2Event)
export class CommonDeletedAdministrativeAreasLevel2EventHandler
  implements IEventHandler<CommonDeletedAdministrativeAreasLevel2Event>
{
  handle(event: CommonDeletedAdministrativeAreasLevel2Event): void {
    // console.log('DeletedAdministrativeAreasLevel2Event: ', event);
  }
}
