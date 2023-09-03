import { CommonUpdatedAdministrativeAreasLevel3Event } from '@app/common/administrative-area-level-3';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel3Event)
export class CommonUpdatedAdministrativeAreasLevel3EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreasLevel3Event>
{
    handle(event: CommonUpdatedAdministrativeAreasLevel3Event): void
    {
        // console.log('CommonUpdatedAdministrativeAreasLevel3Event: ', event);
    }
}
