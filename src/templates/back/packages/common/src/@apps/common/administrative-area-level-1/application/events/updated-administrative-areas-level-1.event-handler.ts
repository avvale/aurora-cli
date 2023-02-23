import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreasLevel1Event } from './updated-administrative-areas-level-1.event';

@EventsHandler(UpdatedAdministrativeAreasLevel1Event)
export class UpdatedAdministrativeAreasLevel1EventHandler implements IEventHandler<UpdatedAdministrativeAreasLevel1Event>
{
    handle(event: UpdatedAdministrativeAreasLevel1Event): void
    {
        // console.log('UpdatedAdministrativeAreasLevel1Event: ', event);
    }
}