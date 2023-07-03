import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreasLevel1Event } from './common-deleted-administrative-areas-level-1.event';

@EventsHandler(CommonDeletedAdministrativeAreasLevel1Event)
export class CommonDeletedAdministrativeAreasLevel1EventHandler implements IEventHandler<CommonDeletedAdministrativeAreasLevel1Event>
{
    handle(event: CommonDeletedAdministrativeAreasLevel1Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel1Event: ', event);
    }
}