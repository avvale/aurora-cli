import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreasLevel2Event } from './created-administrative-areas-level-2.event';

@EventsHandler(CreatedAdministrativeAreasLevel2Event)
export class CreatedAdministrativeAreasLevel2EventHandler implements IEventHandler<CreatedAdministrativeAreasLevel2Event>
{
    handle(event: CreatedAdministrativeAreasLevel2Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel2Event: ', event);
    }
}