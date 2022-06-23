import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreasLevel1Event } from './created-administrative-areas-level-1.event';

@EventsHandler(CreatedAdministrativeAreasLevel1Event)
export class CreatedAdministrativeAreasLevel1EventHandler implements IEventHandler<CreatedAdministrativeAreasLevel1Event>
{
    handle(event: CreatedAdministrativeAreasLevel1Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel1Event: ', event);
    }
}