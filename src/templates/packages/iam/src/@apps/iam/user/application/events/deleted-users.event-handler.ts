import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedUsersEvent } from './deleted-users.event';

@EventsHandler(DeletedUsersEvent)
export class DeletedUsersEventHandler implements IEventHandler<DeletedUsersEvent>
{
    handle(event: DeletedUsersEvent)
    {
        // console.log('DeletedUsersEvent: ', event);
    }
}