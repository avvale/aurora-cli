import { CommonUpdatedAdministrativeAreasLevel2Event } from '@app/common/administrative-area-level-2';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonUpdatedAdministrativeAreasLevel2Event)
export class CommonUpdatedAdministrativeAreasLevel2EventHandler implements IEventHandler<CommonUpdatedAdministrativeAreasLevel2Event>
{
    handle(event: CommonUpdatedAdministrativeAreasLevel2Event): void
    {
        // console.log('CommonUpdatedAdministrativeAreasLevel2Event: ', event);
    }
}
