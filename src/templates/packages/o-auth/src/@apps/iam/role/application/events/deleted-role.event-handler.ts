import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedRoleEvent } from './deleted-role.event';

@EventsHandler(DeletedRoleEvent)
export class DeletedRoleEventHandler implements IEventHandler<DeletedRoleEvent>
{
    handle(event: DeletedRoleEvent)
    {
        // console.log('DeletedRoleEvent: ', event);
    }
}