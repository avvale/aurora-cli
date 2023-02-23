import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedPermissionEvent } from './deleted-permission.event';

@EventsHandler(DeletedPermissionEvent)
export class DeletedPermissionEventHandler implements IEventHandler<DeletedPermissionEvent>
{
    handle(event: DeletedPermissionEvent): void
    {
        // console.log('DeletedPermissionEvent: ', event);
    }
}