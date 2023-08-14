import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonDeletedAdministrativeAreasLevel3Event } from './common-deleted-administrative-areas-level-3.event';

@EventsHandler(CommonDeletedAdministrativeAreasLevel3Event)
export class CommonDeletedAdministrativeAreasLevel3EventHandler implements IEventHandler<CommonDeletedAdministrativeAreasLevel3Event>
{
    handle(event: CommonDeletedAdministrativeAreasLevel3Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel3Event: ', event);
    }
}
