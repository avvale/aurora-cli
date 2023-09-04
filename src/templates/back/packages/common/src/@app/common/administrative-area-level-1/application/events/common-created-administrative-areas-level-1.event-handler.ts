import { CommonCreatedAdministrativeAreasLevel1Event } from '@app/common/administrative-area-level-1';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(CommonCreatedAdministrativeAreasLevel1Event)
export class CommonCreatedAdministrativeAreasLevel1EventHandler implements IEventHandler<CommonCreatedAdministrativeAreasLevel1Event>
{
    handle(event: CommonCreatedAdministrativeAreasLevel1Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel1Event: ', event);
    }
}
