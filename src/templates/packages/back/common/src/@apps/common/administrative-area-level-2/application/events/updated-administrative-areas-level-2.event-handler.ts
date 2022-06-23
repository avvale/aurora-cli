import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedAdministrativeAreasLevel2Event } from './updated-administrative-areas-level-2.event';

@EventsHandler(UpdatedAdministrativeAreasLevel2Event)
export class UpdatedAdministrativeAreasLevel2EventHandler implements IEventHandler<UpdatedAdministrativeAreasLevel2Event>
{
    handle(event: UpdatedAdministrativeAreasLevel2Event): void
    {
        // console.log('UpdatedAdministrativeAreasLevel2Event: ', event);
    }
}