import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedBoundedContextsEvent } from './deleted-bounded-contexts.event';

@EventsHandler(DeletedBoundedContextsEvent)
export class DeletedBoundedContextsEventHandler implements IEventHandler<DeletedBoundedContextsEvent>
{
    handle(event: DeletedBoundedContextsEvent)
    {
        // console.log('DeletedBoundedContextsEvent: ', event);
    }
}