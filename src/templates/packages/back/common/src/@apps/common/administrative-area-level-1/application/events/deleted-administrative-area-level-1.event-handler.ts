import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreaLevel1Event } from './deleted-administrative-area-level-1.event';

@EventsHandler(DeletedAdministrativeAreaLevel1Event)
export class DeletedAdministrativeAreaLevel1EventHandler implements IEventHandler<DeletedAdministrativeAreaLevel1Event>
{
    handle(event: DeletedAdministrativeAreaLevel1Event): void
    {
        // console.log('DeletedAdministrativeAreaLevel1Event: ', event);
    }
}