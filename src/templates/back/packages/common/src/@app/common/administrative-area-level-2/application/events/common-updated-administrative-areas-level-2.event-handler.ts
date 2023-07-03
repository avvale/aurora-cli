import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonUpdatedAdministrativeAreasLevel2Event } from './common-updated-administrative-areas-level-2.event';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel2Event)
export class CommonUpdatedAdministrativeAreasLevel2EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreasLevel2Event>
{
    handle(event: CommonUpdatedAdministrativeAreasLevel2Event): void
    {
        // console.log('CommonUpdatedAdministrativeAreasLevel2Event: ', event);
    }
}