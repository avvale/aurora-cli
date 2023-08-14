import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreasLevel3Event } from './common-updated-administrative-areas-level-3.event';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel3Event)
export class CommonUpdatedAdministrativeAreasLevel3EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreasLevel3Event>
{
    handle(event: CommonUpdatedAdministrativeAreasLevel3Event): void
    {
        // console.log('CommonUpdatedAdministrativeAreasLevel3Event: ', event);
    }
}
