import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CreatedBoundedContextEvent } from './created-bounded-context.event';

@EventsHandler(CreatedBoundedContextEvent)
export class CreatedBoundedContextEventHandler implements IEventHandler<CreatedBoundedContextEvent>
{
    handle(event: CreatedBoundedContextEvent)
    {
        // console.log('CreatedBoundedContextEvent: ', event);
    }
}