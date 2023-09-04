import { CommonDeletedAdministrativeAreasLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonDeletedAdministrativeAreasLevel3Event)
export class CommonDeletedAdministrativeAreasLevel3EventHandler implements IEventHandler<CommonDeletedAdministrativeAreasLevel3Event>
{
    handle(event: CommonDeletedAdministrativeAreasLevel3Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel3Event: ', event);
    }
}
