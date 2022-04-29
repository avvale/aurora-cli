import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedBoundedContextsEvent } from './created-bounded-contexts.event';

@EventsHandler(CreatedBoundedContextsEvent)
export class CreatedBoundedContextsEventHandler implements IEventHandler<CreatedBoundedContextsEvent>
{
    handle(event: CreatedBoundedContextsEvent)
    {
        // console.log('CreatedBoundedContextsEvent: ', event);
    }
}