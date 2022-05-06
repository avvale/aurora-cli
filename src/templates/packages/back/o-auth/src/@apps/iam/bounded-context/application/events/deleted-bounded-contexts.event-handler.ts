import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { DeletedBoundedContextsEvent } from './deleted-bounded-contexts.event';

@EventsHandler(DeletedBoundedContextsEvent)
export class DeletedBoundedContextsEventHandler implements IEventHandler<DeletedBoundedContextsEvent>
{
    handle(event: DeletedBoundedContextsEvent): void
    {
        // console.log('DeletedBoundedContextsEvent: ', event);
    }
}