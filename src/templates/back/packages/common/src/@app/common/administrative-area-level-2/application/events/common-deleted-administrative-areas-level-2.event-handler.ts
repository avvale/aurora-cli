import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreasLevel2Event } from './common-deleted-administrative-areas-level-2.event';

@EventsHandler(CommonDeletedAdministrativeAreasLevel2Event)
export class CommonDeletedAdministrativeAreasLevel2EventHandler implements IEventHandler<CommonDeletedAdministrativeAreasLevel2Event>
{
    handle(event: CommonDeletedAdministrativeAreasLevel2Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel2Event: ', event);
    }
}
