import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreasLevel1Event } from './deleted-administrative-areas-level-1.event';

@EventsHandler(DeletedAdministrativeAreasLevel1Event)
export class DeletedAdministrativeAreasLevel1EventHandler implements IEventHandler<DeletedAdministrativeAreasLevel1Event>
{
    handle(event: DeletedAdministrativeAreasLevel1Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel1Event: ', event);
    }
}