import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreasLevel2Event } from './deleted-administrative-areas-level-2.event';

@EventsHandler(DeletedAdministrativeAreasLevel2Event)
export class DeletedAdministrativeAreasLevel2EventHandler implements IEventHandler<DeletedAdministrativeAreasLevel2Event>
{
    handle(event: DeletedAdministrativeAreasLevel2Event): void
    {
        // console.log('DeletedAdministrativeAreasLevel2Event: ', event);
    }
}