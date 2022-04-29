import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedUserEvent } from './deleted-user.event';

@EventsHandler(DeletedUserEvent)
export class DeletedUserEventHandler implements IEventHandler<DeletedUserEvent>
{
    handle(event: DeletedUserEvent)
    {
        // console.log('DeletedUserEvent: ', event);
    }
}