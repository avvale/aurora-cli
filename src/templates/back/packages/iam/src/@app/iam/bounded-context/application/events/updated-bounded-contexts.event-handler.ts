import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedBoundedContextsEvent } from './updated-bounded-contexts.event';

@EventsHandler(UpdatedBoundedContextsEvent)
export class UpdatedBoundedContextsEventHandler implements IEventHandler<UpdatedBoundedContextsEvent>
{
    handle(event: UpdatedBoundedContextsEvent): void
    {
        // console.log('UpdatedBoundedContextsEvent: ', event);
    }
}