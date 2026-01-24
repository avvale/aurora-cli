import { CommonUpdatedAdministrativeAreaLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreaLevel3Event)
export class CommonUpdatedAdministrativeAreaLevel3EventHandler
  implements IEventHandler<CommonUpdatedAdministrativeAreaLevel3Event>
{
  handle(event: CommonUpdatedAdministrativeAreaLevel3Event): void {
    // console.log('UpdatedAdministrativeAreaLevel3Event: ', event);
  }
}
