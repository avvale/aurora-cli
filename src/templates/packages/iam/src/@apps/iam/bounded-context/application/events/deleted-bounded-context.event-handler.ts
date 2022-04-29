import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedBoundedContextEvent } from './deleted-bounded-context.event';

@EventsHandler(DeletedBoundedContextEvent)
export class DeletedBoundedContextEventHandler implements IEventHandler<DeletedBoundedContextEvent>
{
    handle(event: DeletedBoundedContextEvent)
    {
        // console.log('DeletedBoundedContextEvent: ', event);
    }
}