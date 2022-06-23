import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedAdministrativeAreaLevel3Event } from './deleted-administrative-area-level-3.event';

@EventsHandler(DeletedAdministrativeAreaLevel3Event)
export class DeletedAdministrativeAreaLevel3EventHandler implements IEventHandler<DeletedAdministrativeAreaLevel3Event>
{
    handle(event: DeletedAdministrativeAreaLevel3Event): void
    {
        // console.log('DeletedAdministrativeAreaLevel3Event: ', event);
    }
}