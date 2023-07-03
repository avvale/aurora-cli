import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreasLevel2Event } from './common-created-administrative-areas-level-2.event';

@EventsHandler(CommonCreatedAdministrativeAreasLevel2Event)
export class CommonCreatedAdministrativeAreasLevel2EventHandler implements IEventHandler<CommonCreatedAdministrativeAreasLevel2Event>
{
    handle(event: CommonCreatedAdministrativeAreasLevel2Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel2Event: ', event);
    }
}