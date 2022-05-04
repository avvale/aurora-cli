import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedRolesEvent } from './deleted-roles.event';

@EventsHandler(DeletedRolesEvent)
export class DeletedRolesEventHandler implements IEventHandler<DeletedRolesEvent>
{
    handle(event: DeletedRolesEvent)
    {
        // console.log('DeletedRolesEvent: ', event);
    }
}