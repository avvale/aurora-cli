import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreaLevel2Event } from './deleted-administrative-area-level-2.event';

@EventsHandler(DeletedAdministrativeAreaLevel2Event)
export class DeletedAdministrativeAreaLevel2EventHandler implements IEventHandler<DeletedAdministrativeAreaLevel2Event>
{
    handle(event: DeletedAdministrativeAreaLevel2Event): void
    {
        // console.log('DeletedAdministrativeAreaLevel2Event: ', event);
    }
}