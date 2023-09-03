import { CommonDeletedAdministrativeAreasLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreasLevel1Event)
export class CommonDeletedAdministrativeAreasLevel1EventHandler implements IEventHandler<CommonDeletedAdministrativeAreasLevel1Event>
{
    handle(event: CommonDeletedAdministrativeAreasLevel1Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel1Event: ', event);
    }
}
