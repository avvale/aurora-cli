import { CommonCreatedAdministrativeAreasLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreasLevel3Event)
export class CommonCreatedAdministrativeAreasLevel3EventHandler
  implements IEventHandler<CommonCreatedAdministrativeAreasLevel3Event>
{
  handle(event: CommonCreatedAdministrativeAreasLevel3Event): void {
    // console.log('CreatedAdministrativeAreasLevel3Event: ', event);
  }
}
