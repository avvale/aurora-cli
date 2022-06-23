import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreasLevel3Event } from './updated-administrative-areas-level-3.event';

@EventsHandler(UpdatedAdministrativeAreasLevel3Event)
export class UpdatedAdministrativeAreasLevel3EventHandler implements IEventHandler<UpdatedAdministrativeAreasLevel3Event>
{
    handle(event: UpdatedAdministrativeAreasLevel3Event): void
    {
        // console.log('UpdatedAdministrativeAreasLevel3Event: ', event);
    }
}