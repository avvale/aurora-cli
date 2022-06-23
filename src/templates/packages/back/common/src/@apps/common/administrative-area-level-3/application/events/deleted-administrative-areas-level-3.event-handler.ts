import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreasLevel3Event } from './deleted-administrative-areas-level-3.event';

@EventsHandler(DeletedAdministrativeAreasLevel3Event)
export class DeletedAdministrativeAreasLevel3EventHandler implements IEventHandler<DeletedAdministrativeAreasLevel3Event>
{
    handle(event: DeletedAdministrativeAreasLevel3Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel3Event: ', event);
    }
}