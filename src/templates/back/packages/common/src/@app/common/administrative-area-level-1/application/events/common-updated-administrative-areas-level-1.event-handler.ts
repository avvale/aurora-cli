import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreasLevel1Event } from './common-updated-administrative-areas-level-1.event';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel1Event)
export class CommonUpdatedAdministrativeAreasLevel1EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreasLevel1Event>
{
    handle(event: CommonUpdatedAdministrativeAreasLevel1Event): void
    {
        // console.log('CommonUpdatedAdministrativeAreasLevel1Event: ', event);
    }
}
