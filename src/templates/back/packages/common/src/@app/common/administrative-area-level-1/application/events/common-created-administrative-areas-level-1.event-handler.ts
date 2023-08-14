import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreasLevel1Event } from './common-created-administrative-areas-level-1.event';

@EventsHandler(CommonCreatedAdministrativeAreasLevel1Event)
export class CommonCreatedAdministrativeAreasLevel1EventHandler implements IEventHandler<CommonCreatedAdministrativeAreasLevel1Event>
{
    handle(event: CommonCreatedAdministrativeAreasLevel1Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel1Event: ', event);
    }
}
