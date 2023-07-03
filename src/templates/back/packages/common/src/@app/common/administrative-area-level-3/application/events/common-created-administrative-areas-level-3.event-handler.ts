import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CommonCreatedAdministrativeAreasLevel3Event } from './common-created-administrative-areas-level-3.event';

@EventsHandler(CommonCreatedAdministrativeAreasLevel3Event)
export class CommonCreatedAdministrativeAreasLevel3EventHandler implements IEventHandler<CommonCreatedAdministrativeAreasLevel3Event>
{
    handle(event: CommonCreatedAdministrativeAreasLevel3Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel3Event: ', event);
    }
}