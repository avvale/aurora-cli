import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedPermissionsEvent } from './deleted-permissions.event';

@EventsHandler(DeletedPermissionsEvent)
export class DeletedPermissionsEventHandler implements IEventHandler<DeletedPermissionsEvent>
{
    handle(event: DeletedPermissionsEvent)
    {
        // console.log('DeletedPermissionsEvent: ', event);
    }
}