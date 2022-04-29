import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UpdatedBoundedContextEvent } from './updated-bounded-context.event';

@EventsHandler(UpdatedBoundedContextEvent)
export class UpdatedBoundedContextEventHandler implements IEventHandler<UpdatedBoundedContextEvent>
{
    handle(event: UpdatedBoundedContextEvent)
    {
        // console.log('UpdatedBoundedContextEvent: ', event);
    }
}