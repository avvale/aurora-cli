import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedAdministrativeAreasLevel3Event } from './created-administrative-areas-level-3.event';

@EventsHandler(CreatedAdministrativeAreasLevel3Event)
export class CreatedAdministrativeAreasLevel3EventHandler implements IEventHandler<CreatedAdministrativeAreasLevel3Event>
{
    handle(event: CreatedAdministrativeAreasLevel3Event): void
    {
        // console.log('CreatedAdministrativeAreasLevel3Event: ', event);
    }
}